import * as THREE from './vendor/three.module.js';
import {DIMENSIONS,ASSET_PATHS} from './config.js';
import {ASSET_URLS} from './asset-data.js';
import {group,box,quad,panel,beams,textTexture} from './geometry.js';

/** Builds a reusable, independent THREE.Group. All source images remain local. */
export async function createFlicCenter(options={}){
 const d={...DIMENSIONS,...options.dimensions},sx=d.width/32,sz=d.depth/12,sy=d.wallHeight/4.15;
 const root=new THREE.Group();root.name='FLiC_Dong_Thap_Center';root.userData={units:'metres',up:'Y',front:'+Z',dimensions:d,geometryConfidence:'photo-based-estimate',roofConfidence:'inferred',source:'User photographs take precedence over generated reference sheets',origin:'ground centre of main building'};
 const tex={},images={},loader=new THREE.TextureLoader();
 await Promise.all(Object.entries(ASSET_PATHS).map(async([key,path])=>{let url=(options.assets||ASSET_URLS)[key]||path;if(options.assetBaseUrl&&!url.startsWith('data:'))url=new URL(url,options.assetBaseUrl).href;const t=await loader.loadAsync(url);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;t.name=key;t.userData.mimeType=/\.jpe?g$/i.test(path)?'image/jpeg':'image/png';tex[key]=t;images[key]=t.image;}));
 const m={white:new THREE.MeshStandardMaterial({color:0xe7e7d8,roughness:.85}),wall:new THREE.MeshStandardMaterial({color:0x90b5bd,roughness:.93}),blue:new THREE.MeshStandardMaterial({color:0x123d73,roughness:.55}),red:new THREE.MeshStandardMaterial({color:0x961b36,roughness:.65}),silver:new THREE.MeshStandardMaterial({color:0xcccfc9,roughness:.43,metalness:.58}),glass:new THREE.MeshStandardMaterial({color:0x126a60,roughness:.29,metalness:.2}),dark:new THREE.MeshStandardMaterial({color:0x193435,roughness:.7}),roof:new THREE.MeshStandardMaterial({color:0xb5bec1,roughness:.76,metalness:.28}),asphalt:new THREE.MeshStandardMaterial({color:0x454b50,roughness:.98}),track:new THREE.MeshStandardMaterial({color:0x9b695e,roughness:1}),soil:new THREE.MeshStandardMaterial({color:0x514738,roughness:1}),grass:new THREE.MeshStandardMaterial({color:0x637a48,roughness:1}),wood:new THREE.MeshStandardMaterial({color:0x655848,roughness:1}),leaves:new THREE.MeshStandardMaterial({color:0x3c714b,roughness:1}),flower:new THREE.MeshStandardMaterial({color:0x9868b0,roughness:.95})};
 const art={};for(const [key,t]of Object.entries(tex))art[key]=new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide,transparent:key.startsWith('logo'),alphaTest:key.startsWith('logo')?.01:0});
 const parts={};for(const key of ['building','storefront','signage','standees','roof','murals','ground','track','planting','context','utilities'])parts[key]=group(root,'FLiC_'+key,{part:key});
 const clickable=[];function image(key,w,h,pos,parent=parts.signage,angle=0){const p=panel(parent,'Artwork_'+key,w,h,pos,art[key],angle,{assetId:key,sourceFile:ASSET_PATHS[key],evidence:'supplied-image'});clickable.push(p);return p;}
 // Enclosure and visible front columns, independent from the inferred roof.
 box(parts.building,'Foundation',[32,.18,12],[0,.09,0],m.white);
 box(parts.building,'Rear_wall',[32,4.15,.18],[0,2.17,-5.92],m.wall);
 box(parts.building,'Left_end_wall',[.18,4.15,12],[-15.92,2.17,0],m.wall);
 box(parts.building,'Right_end_wall',[.18,4.15,12],[15.92,2.17,0],m.wall);
 box(parts.building,'Front_header',[32,.82,.24],[0,3.78,5.93],m.blue);
 box(parts.building,'Interior_shadow',[31.6,3.35,.05],[0,1.85,5.1],m.dark);
 const piers=[[-15.6,.8],[-8.25,.9],[-.5,1.2],[7.8,.8],[15.7,.6]];
 piers.forEach(([x,w],i)=>box(parts.building,'Front_pier_'+i,[w,3.37,.38],[x,1.85,6.04],i===4?m.red:m.blue));
 const bays=[[-11.95,6.5],[-4.45,6.7],[3.75,7.3],[11.8,7.2]],gates=[];
 bays.forEach(([x,w],i)=>{
   const bay=group(parts.storefront,'Bay_'+(i+1),{width:w,evidence:'front photos',glass:'green glazed doors with silver folding grille'});bay.position.set(x,0,0);
   box(bay,'Green_glazing',[w-.08,3.12,.055],[0,1.82,6.03],m.glass);
   for(const xx of [-w/2+.04,0,w/2-.04])box(bay,'Aluminium_mullion',[.055,3.17,.09],[xx,1.82,6.1],m.silver);
   for(const yy of [.25,3.39])box(bay,'Aluminium_rail',[w,.055,.1],[0,yy,6.1],m.silver);
   for(const sign of [-1,1]){
     const half=group(bay,'Folding_grille_'+(sign<0?'L':'R'));half.position.set(sign*w/4,0,0);half.userData.originalX=half.position.x;half.userData.sign=sign;half.userData.halfWidth=w/2;gates.push(half);
     const lines=[],halfWidth=w/2,count=Math.round(halfWidth/.16),step=halfWidth/count;
     for(let n=0;n<=count;n++){const xx=-halfWidth/2+n*step;lines.push([[xx,.28,6.19],[xx,3.36,6.19]]);for(const yy of [.55,1.32,2.12,2.87])if(n<count){lines.push([[xx,yy-.21,6.21],[xx+step,yy+.21,6.21]],[[xx,yy+.21,6.21],[xx+step,yy-.21,6.21]]);}}
     beams(half,'Scissor_lattice',lines,m.silver,.012);
   }
   box(bay,'Door_pull',[.035,.35,.06],[.12,1.65,6.24],m.silver);
 });
 // Printed panels use provided bitmaps, rather than regenerated letters or QR.
 const fasciaY=d.fasciaBottom+d.fasciaHeight/2;
 box(parts.signage,'Main_blue_fascia',[24,d.fasciaHeight,1.05],[-4,fasciaY,6.58],m.blue);
 image('blue',23.96,d.fasciaHeight-.03,[-4,fasciaY,7.112]);
 // Compensate for scene width/depth scale so the supplied circular logo stays circular.
 image('logoFlic',1.52/sx,1.52/sy,[-14.4,fasciaY,7.125]);
 box(parts.signage,'HSK_fascia',[8,d.fasciaHeight,1.05],[12,fasciaY,6.58],m.white);
 image('green',7.96,d.fasciaHeight-.03,[12,fasciaY,7.114]);
 box(parts.signage,'Canopy_soffit',[32,.12,1.4],[0,3.44,6.53],m.blue);
 for(let x=-14;x<=14;x+=3.5){const light=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.018,12),new THREE.MeshBasicMaterial({color:0xfff7de}));light.position.set(x,3.365,6.7);parts.signage.add(light);}
 image('stars',.74,2.91,[-15.6,1.8,6.25]);
 image('vstepWall',.85,3.02,[-8.25,1.8,6.25]);
 image('metal',1.06,.705,[-.5,2.71,6.25]);
 image('hsk',1.05,1.575,[-.5,1.27,6.26]);
 image('ielts',.74,.83,[7.8,2.85,6.25]);
 // Only the visible upper part of this narrow IELTS pier is evidenced.
 image('hanging',1.12,1.65,[-4.45,1.96,6.3],parts.signage);
 function stand(key,x,z,height){const w=height*images[key].width/images[key].height,g=group(parts.standees,'Stand_'+key,{assetId:key});g.position.set(x,.19,z);box(g,'Printed_board',[w+.055,height+.055,.065],[0,height/2+.12,0],m.white);image(key,w,height,[0,height/2+.12,.038],g);beams(g,'Aluminium_supports',[[[-w*.4,.03,-.2],[-w*.4,height*.95,-.015]],[[w*.4,.03,-.2],[w*.4,height*.95,-.015]],[[-w*.4,.02,-.2],[-w*.4,.02,.18]],[[w*.4,.02,-.2],[w*.4,.02,.18]]],m.silver,.018);return g;}
 stand('languageStand',-19.1,8.0,2.06);stand('itStand',-17.76,8.0,2.06);stand('vstepStand',7.95,7.85,2.35);
 // Rear/left artwork is rectified from actual photographs. No invented mural.
 const left=quad(parts.murals,'Mural_left_end',[[-16.025,4.13,5.96],[-16.025,4.13,-5.96],[-16.025,.19,-5.96],[-16.025,.19,5.96]],art.muralLeft);left.userData.assetId='muralLeft';clickable.push(left);
 // Official logo is applied as a circular decal, preserving its proportions.
 const universityDecal=new THREE.Mesh(new THREE.CircleGeometry(1.10,72),art.logoDthu);universityDecal.name='Official_DThU_logo_decal';universityDecal.position.set(-16.047,2.0,4.0);universityDecal.rotation.y=-Math.PI/2;universityDecal.scale.set(1/sz,1/sy,1);universityDecal.userData={assetId:'logoDthu',sourceFile:ASSET_PATHS.logoDthu,aspectRatio:1};parts.murals.add(universityDecal);clickable.push(universityDecal);
 const split=-1.25;
 const rearLeft=quad(parts.murals,'Mural_back_left',[[-15.96,4.13,-6.025],[split,4.13,-6.025],[split,.19,-6.025],[-15.96,.19,-6.025]],art.muralBackLeft);rearLeft.userData.assetId='muralBackLeft';clickable.push(rearLeft);
 const rearRight=quad(parts.murals,'Mural_back_right',[[split,4.13,-6.025],[15.96,4.13,-6.025],[15.96,.19,-6.025],[split,.19,-6.025]],art.muralBackRight);rearRight.userData.assetId='muralBackRight';clickable.push(rearRight);
 for(let x=-14;x<15;x+=2.5)box(parts.building,'Rear_ventilation_bricks',[1.18,.17,.12],[x,3.68,-6.1],m.white);
 for(const x of [2.8,11.5]){box(parts.utilities,'Rear_air_conditioner',[.8,.56,.37],[x,3.45,-6.27],m.white);const fan=new THREE.Mesh(new THREE.CylinderGeometry(.21,.21,.025,20),m.silver);fan.rotation.x=Math.PI/2;fan.position.set(x,3.45,-6.47);parts.utilities.add(fan);}
 // Roof shape is a deliberately editable estimate, kept in its own layer.
 parts.roof.userData.confidence='inferred, no overhead photograph or survey';
 quad(parts.roof,'Shallow_corrugated_roof',[[-16.55,4.47,6.9],[16.55,4.47,6.9],[16.55,4.21,-6.45],[-16.55,4.21,-6.45]],m.roof);
 const roofLines=[];for(let x=-16.5;x<16.6;x+=.19)roofLines.push([[x,4.49,6.9],[x,4.23,-6.45]]);beams(parts.roof,'Roof_corrugations',roofLines,m.roof,.016);
 box(parts.roof,'Rear_fascia',[33.1,.14,.13],[0,4.21,-6.45],m.white);
 // Pavement and road are distinct physical layers.
 const tile=document.createElement('canvas');tile.width=256;tile.height=256;const ctx=tile.getContext('2d');ctx.fillStyle='#a7a79e';ctx.fillRect(0,0,256,256);ctx.strokeStyle='#777b75';ctx.lineWidth=1.7;ctx.strokeRect(1,1,254,254);for(const r of [29,61,94,122]){ctx.beginPath();ctx.arc(128,128,r,0,Math.PI*2);ctx.stroke();}for(let i=0;i<16;i++){const a=i*Math.PI/8;ctx.beginPath();ctx.moveTo(128+29*Math.cos(a),128+29*Math.sin(a));ctx.lineTo(128+122*Math.cos(a),128+122*Math.sin(a));ctx.stroke();}const tt=new THREE.CanvasTexture(tile);tt.colorSpace=THREE.SRGBColorSpace;tt.wrapS=tt.wrapT=THREE.RepeatWrapping;tt.repeat.set(45,8);const paving=new THREE.MeshStandardMaterial({map:tt,roughness:.97});
 box(parts.ground,'Pedestrian_sidewalk',[46,.14,5.2],[0,.07,8.85],paving);
 box(parts.ground,'Street_asphalt',[60,.09,8.7],[0,-.04,15.8],m.asphalt);
 box(parts.ground,'Sidewalk_kerb',[46,.16,.15],[0,.07,11.45],m.white);
 box(parts.ground,'Campus_grass',[64,.08,17],[0,-.10,-15.6],m.grass);
 box(parts.ground,'Left_campus_ground',[10,.08,31],[-27,-.10,-2],m.grass);
 const shape=new THREE.Shape();shape.moveTo(-16,-12.6);shape.lineTo(23,-12.6);shape.lineTo(23,-6.6);shape.lineTo(-16,-6.6);shape.quadraticCurveTo(-16.6,-6.6,-16.6,-6);shape.lineTo(-16.6,9.7);shape.lineTo(-22.6,9.7);shape.lineTo(-22.6,-6);shape.quadraticCurveTo(-22.6,-12.6,-16,-12.6);const track=new THREE.Mesh(new THREE.ShapeGeometry(shape,24),m.track);track.rotation.x=Math.PI/2;track.position.y=.025;track.material.side=THREE.DoubleSide;track.name='Rear_L_shaped_running_track';track.receiveShadow=true;parts.track.add(track);
 const lineMaterial=new THREE.MeshBasicMaterial({color:0xe5e2d3});
 for(const radius of [1.15,2.48,3.81,5.14]){const points=[];points.push(new THREE.Vector3(23,.038,-6-radius),new THREE.Vector3(-16,.038,-6-radius));for(let i=1;i<=32;i++){const t=i*Math.PI/64;points.push(new THREE.Vector3(-16-radius*Math.sin(t),.038,-6-radius*Math.cos(t)));}points.push(new THREE.Vector3(-16-radius,.038,9.7));const geometry=new THREE.BufferGeometry().setFromPoints(points);const line=new THREE.Line(geometry,new THREE.LineBasicMaterial({color:0xeae6dc}));line.name='Running_lane_line';parts.track.add(line);
   for(let i=0;i<points.length-1;i++){const p=points[i],q=points[i+1],dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz),nx=-dz/len*.024,nz=dx/len*.024;quad(parts.track,'Lane_paint',[[p.x+nx,.04,p.z+nz],[q.x+nx,.04,q.z+nz],[q.x-nx,.04,q.z-nz],[p.x-nx,.04,p.z-nz]],lineMaterial);}
 }
 // Narrow flower bed, with a clear running lane alongside.
 box(parts.planting,'Rear_narrow_flower_bed',[32,.18,.43],[0,.10,-6.34],m.soil);
 box(parts.planting,'Left_narrow_flower_bed',[.43,.18,12],[-16.34,.10,0],m.soil);
 let seed=261122;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 const shrubGeo=new THREE.IcosahedronGeometry(1,0),shrub=new THREE.InstancedMesh(shrubGeo,m.leaves,200),flower=new THREE.InstancedMesh(shrubGeo,m.flower,140),dummy=new THREE.Object3D();
 for(let i=0;i<200;i++){const back=i<150;dummy.position.set(back?-15.8+(i/149)*31.6:-16.34,.25+rnd()*.16,back?-6.34:-5.8+(i-150)/49*11.6);dummy.scale.set(.15+rnd()*.06,.19+rnd()*.1,.13+rnd()*.08);dummy.rotation.y=rnd()*6.28;dummy.updateMatrix();shrub.setMatrixAt(i,dummy.matrix);}
 for(let i=0;i<140;i++){dummy.position.set(-15.8+(i/139)*31.6,.49+rnd()*.12,-6.34+(rnd()-.5)*.15);dummy.scale.setScalar(.025+rnd()*.018);dummy.updateMatrix();flower.setMatrixAt(i,dummy.matrix);}shrub.name='Border_shrubs';flower.name='Border_purple_flowers';parts.planting.add(shrub,flower);
 const treeRoot=group(parts.planting,'Tall_trees',{subpart:'trees'});
 for(let i=0;i<12;i++){const x=-25+i*4.7,z=-15.7-(i%3)*1.6,h=7.8+rnd()*3.5;const tree=group(treeRoot,'Shade_tree_'+i);tree.position.set(x,0,z);const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.13,.23,h,7),m.wood);trunk.position.y=h/2;tree.add(trunk);for(let k=0;k<5;k++){const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(1,1),m.leaves);crown.position.set((rnd()-.5)*2.3,h-1+k*.62,(rnd()-.5)*2);crown.scale.set(1.6+rnd()*.6,1.5,1.6);crown.castShadow=true;tree.add(crown);}box(tree,'Painted_white_tree_base',[.34,.8,.34],[0,.4,0],m.white);}
 // Neighbours are separate, removable context, not part of the centre.
 box(parts.context,'Dental_neighbour_facade',[6,4.1,.30],[-19,2.05,5.87],m.white);box(parts.context,'Dental_sign_backing',[6,1.8,.6],[-19,4.4,6.8],m.blue);
 panel(parts.context,'Dental_sign',5.95,1.7,[-19,4.4,7.11],new THREE.MeshBasicMaterial({map:textTexture('NHA KHOA\nPHƯƠNG THÀNH',{bg:'#194879',font:'bold 105px Arial'})}));
 const fence=[];for(let x=-21.9;x<-16.1;x+=.18)fence.push([[x,.15,6.28],[x,2.42,6.28]]);fence.push([[-22,.55,6.28],[-16,.55,6.28]],[[-22,2.4,6.28],[-16,2.4,6.28]]);beams(parts.context,'Dental_blue_pedestrian_gate',fence,m.blue,.023);
 box(parts.context,'Coffee_neighbour_facade',[6,4.0,.30],[19,2,5.87],m.white);box(parts.context,'Coffee_header',[6,1.5,.65],[19,4.25,6.8],m.dark);panel(parts.context,'Coffee_name',5.9,1.4,[19,4.25,7.14],new THREE.MeshBasicMaterial({map:textTexture('MILANO COFFEE',{bg:'#242a2c',font:'bold 120px Georgia'})}));
 for(let i=0;i<20;i++)quad(parts.context,'Striped_coffee_awning',[[16+i*.3,3.6,6.0],[16.3+i*.3,3.6,6.0],[16.3+i*.3,3.0,8.0],[16+i*.3,3.0,8.0]],i%2?m.white:m.glass);
 box(parts.context,'Coffee_green_entrance_mat',[5.7,.03,3.1],[19,.17,8.25],m.grass);
 for(const x of [17.0,21.0]){const pot=new THREE.Mesh(new THREE.CylinderGeometry(.3,.2,.65,12),m.white);pot.position.set(x,.5,9.5);parts.context.add(pot);const c=new THREE.Mesh(new THREE.IcosahedronGeometry(.55,1),m.leaves);c.position.set(x,1.25,9.5);parts.context.add(c);}
 const cables=[];for(let i=0;i<5;i++)cables.push([[-23,6.2+i*.11,10.4],[23,6.15+i*.11,10.4]]);beams(parts.utilities,'Street_overhead_cables',cables,m.dark,.012);
 // Rescale physical building and local setting together, without changing camera state.
 root.scale.set(sx,sy,sz);
 const collisions=[{name:'rear-wall',min:[-16,0,-6.1],max:[16,4.15,-5.8]},{name:'left-wall',min:[-16.1,0,-6],max:[-15.8,4.15,6]},{name:'right-wall',min:[15.8,0,-6],max:[16.1,4.15,6]}];
 function setGateOpen(amount){amount=THREE.MathUtils.clamp(amount,0,1);for(const g of gates){const width=g.userData.halfWidth;g.scale.x=1-amount*.90;g.position.x=g.userData.sign*(width-width*g.scale.x/2);}}
 function setPart(name,visible){if(!parts[name])throw new Error('Unknown part '+name);parts[name].visible=!!visible;}
 function setWireframe(on){root.traverse(o=>{if(o.isMesh)for(const mat of [].concat(o.material))if(!mat.map)mat.wireframe=on;});}
 root.updateMatrixWorld(true);
 return {root,parts,dimensions:d,textures:tex,images,materials:m,art,clickable,gates,collisions,setGateOpen,setPart,setWireframe,treeRoot};
}
