import * as THREE from './vendor/three.module.js';
import {OrbitControls} from './vendor/OrbitControls.js';
import {GLTFExporter} from './vendor/GLTFExporter.js';
import {createFlicCenter} from './model.js';
import {ASSET_URLS,REFERENCE_URLS} from './asset-data.js';
import {LABELS} from './config.js';

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const state={view:'overview',gateOpen:0,locked:false};
const viewNames={front:'Mặt trước',back:'Mặt sau · Tranh tường và đường chạy',left:'Bên trái · Đầu hồi',right:'Bên phải',top:'Nhìn từ trên · Mái ước dựng',low:'Nhìn từ tầm thấp',overview:'Phối cảnh mặt trước',rearOverview:'Phối cảnh mặt sau'};
function status(text){$('[data-status]').textContent=text;}
function download(data,name,type){const blob=data instanceof Blob?data:new Blob([data],{type});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),3000);}
function dialog(title){$('[data-dialog-title]').textContent=title;const b=$('[data-dialog-body]');b.replaceChildren();if(!$('[data-dialog]').open)$('[data-dialog]').showModal();return b;}
function showImage(title,url){const b=dialog(title),img=document.createElement('img');img.alt=title;img.src=url;b.append(img);}
function showAsset(id){if(ASSET_URLS[id])showImage(LABELS[id]||id,ASSET_URLS[id]);}
function showAssets(){const grid=document.createElement('div');grid.className='asset-grid';for(const key of ['blue','green','logoFlic','logoDthu','metal','hsk','vstepStand','languageStand','itStand','stars','vstepWall','hanging']){const button=document.createElement('button'),img=document.createElement('img'),caption=document.createElement('span');img.src=ASSET_URLS[key];img.alt=LABELS[key];caption.textContent=LABELS[key];button.append(img,caption);button.onclick=()=>showAsset(key);grid.append(button);}dialog('Bảng hiệu, standee và logo theo tệp tham chiếu').append(grid);}
function help(){dialog('Sử dụng mô hình').innerHTML='<p>Chọn một trong sáu hướng hoặc hai góc phối cảnh. Kéo chuột trái để xoay, chuột phải để di chuyển, cuộn để phóng to. Trên điện thoại dùng một ngón để xoay, hai ngón để zoom.</p><p>“Khóa góc” giữ hướng nhìn và vẫn cho zoom. Bật/tắt từng lớp để quan sát công trình. Thanh “Thu cửa kéo” thu các nan kim loại sang hai bên.</p><p>Bấm bảng hiệu hoặc standee trong cảnh để mở ảnh nguồn. “Chụp PNG” lưu đúng khung nhìn. “Xuất GLB” xuất phạm vi đã chọn, kèm ảnh vật liệu bên trong tệp.</p><p>Phần mái, chiều sâu, mặt phải và các vùng khuất được ước dựng. Mô hình chưa mô tả nội thất vì chưa có ảnh. Tệp SVG nguồn có bốn góc mỗi bảng; sáu hướng ở đây là sáu camera của mô hình.</p><p>Để ghép vào game, dùng <code>createFlicCenter()</code> trong <code>model.js</code> hoặc các tệp GLB đi kèm. Đơn vị mét, mặt trước hướng +Z, trục đứng +Y.</p>';}

async function start(){
 const stage=$('#viewport'),renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.13;renderer.shadowMap.enabled=true;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;stage.append(renderer.domElement);let dirty=true;function invalidate(){dirty=true;renderer.shadowMap.needsUpdate=true;}
 const scene=new THREE.Scene();scene.background=new THREE.Color(0xdbe6e9);scene.fog=new THREE.Fog(0xdbe6e9,90,200);
 const camera=new THREE.PerspectiveCamera(39,1,.1,250);const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.14;controls.minDistance=2;controls.maxDistance=140;controls.minPolarAngle=.001;controls.maxPolarAngle=Math.PI/2+.07;controls.zoomToCursor=true;controls.screenSpacePanning=true;
 scene.add(new THREE.HemisphereLight(0xe9f5ff,0x69715c,2.15));const sun=new THREE.DirectionalLight(0xfff6dc,2.3);sun.position.set(-24,34,25);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-45,right:45,top:35,bottom:-35,near:.5,far:110});sun.shadow.normalBias=.035;sun.shadow.bias=-.00025;scene.add(sun);
 const kit=await createFlicCenter();scene.add(kit.root);
 for(const img of $$('[data-logo]'))img.src=ASSET_URLS[img.dataset.logo];
 $('[data-dimensions]').textContent=`Khối chính ≈ ${kit.dimensions.width} × ${kit.dimensions.depth} m · chưa đo thực tế`;
 function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();dirty=true;}
 new ResizeObserver(resize).observe(stage);resize();
 function setView(view){if(!viewNames[view])throw new Error('Unknown camera '+view);state.view=view;const aspect=camera.aspect,fit=Math.max(1,1.55/aspect),dist=fit;
   const poses={overview:[[30,18,35],[0,2.0,1]],rearOverview:[[-29,16,-33],[-1,2.0,-3]],front:[[0,4.5,36],[0,2.6,3]],back:[[0,5.2,-35],[0,2.1,-5]],left:[[-39,6.4,0],[-5,2,0]],right:[[39,6.4,0],[5,2,0]],top:[[0,54,.08],[0,0,0]],low:[[0,.78,33],[0,2.5,4]]};
   const [pos,target]=poses[view],t=new THREE.Vector3(...target),p=new THREE.Vector3(...pos);p.sub(t).multiplyScalar(dist).add(t);controls.target.copy(t);camera.position.copy(p);camera.up.set(0,1,0);camera.lookAt(t);controls.update();kit.treeRoot.visible=!['top','back','rearOverview','left'].includes(view);
   $$('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===view)));$('[data-view-name]').textContent=viewNames[view];invalidate();renderer.render(scene,camera);
 }
 function zoom(factor){const delta=camera.position.clone().sub(controls.target);const distance=THREE.MathUtils.clamp(delta.length()*factor,controls.minDistance,controls.maxDistance);delta.setLength(distance);camera.position.copy(controls.target).add(delta);controls.update();renderer.render(scene,camera);}
 async function exportGLB(scope='building'){
   const exportRoot=kit.root.clone(true);const keep=scope==='building'?new Set(['building','storefront','signage','standees','roof','murals','utilities']):scope==='signs'?new Set(['signage','standees']):null;
   if(keep)for(const child of exportRoot.children)child.visible=keep.has(child.userData.part);
   // Current folding state and visibility are retained in overall export.
   exportRoot.updateMatrixWorld(true);
   return await new GLTFExporter().parseAsync(exportRoot,{binary:true,onlyVisible:true,maxTextureSize:4096,trs:false});
 }
 $$('[data-view]').forEach(button=>button.onclick=()=>setView(button.dataset.view));$('[data-home]').onclick=()=>setView('overview');$('[data-zoom-in]').onclick=()=>zoom(.83);$('[data-zoom-out]').onclick=()=>zoom(1/.83);
 $('[data-lock]').onchange=e=>{state.locked=e.target.checked;controls.enableRotate=!state.locked;controls.enablePan=!state.locked;controls.zoomToCursor=!state.locked;};
 $$('[data-part]').forEach(input=>input.onchange=()=>{kit.setPart(input.dataset.part,input.checked);invalidate();});$('[data-wire]').onchange=e=>{kit.setWireframe(e.target.checked);invalidate();};
 $('[data-gates]').oninput=e=>{state.gateOpen=Number(e.target.value)/100;kit.setGateOpen(state.gateOpen);$('[data-gate-value]').value=e.target.value+'%';invalidate();};
 $('[data-assets]').onclick=showAssets;$$('[data-reference]').forEach(b=>b.onclick=()=>showImage(b.textContent,REFERENCE_URLS[b.dataset.reference]));$('[data-help]').onclick=help;$('[data-close]').onclick=()=>$('[data-dialog]').close();
 $('[data-shot]').onclick=()=>{renderer.render(scene,camera);renderer.domElement.toBlob(b=>download(b,'FLiC_'+state.view+'.png','image/png'));};
 $('[data-export]').onclick=async()=>{const button=$('[data-export]');button.disabled=true;status('Đang đóng gói mô hình và ảnh vật liệu…');try{const scope=$('[data-export-scope]').value,binary=await exportGLB(scope);download(binary,'FLiC_'+scope+'.glb','model/gltf-binary');status('Đã xuất GLB kèm ảnh vật liệu.');}catch(error){status('Xuất GLB chưa thành công: '+error.message);console.error(error);}finally{button.disabled=false;}};
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null;
 renderer.domElement.addEventListener('pointerdown',e=>down={x:e.clientX,y:e.clientY});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>5)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const visible=kit.clickable.filter(o=>{let current=o;while(current){if(!current.visible)return false;current=current.parent;}return true;});const hit=raycaster.intersectObjects(visible,false)[0];if(hit?.object.userData.assetId)showAsset(hit.object.userData.assetId);});
 setView('overview');$('[data-loader]').hidden=true;
 window.flicApp={THREE,kit,scene,camera,renderer,controls,state,setView,zoom,exportGLB,showAsset,showAssets,assetURLs:ASSET_URLS,referenceURLs:REFERENCE_URLS,ready:true};
 controls.addEventListener('change',()=>{dirty=true;});
 renderer.setAnimationLoop(()=>{const changed=controls.update();if(changed||dirty){renderer.render(scene,camera);dirty=false;}});
}
start().catch(error=>{console.error(error);$('[data-loader]').hidden=true;$('[data-error]').hidden=false;$('[data-error]').textContent='Không mở được mô hình: '+error.message+'. Hãy dùng FLiC_Trung_tam_Ngoai_ngu_Tin_hoc.html hoặc chạy START_SERVER.bat.';});
