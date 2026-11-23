from pathlib import Path
from PIL import Image
import numpy as np, json
root=Path(__file__).parent/'University_Map_Simulator_Review'
rows=json.loads((root/'frames_manifest.json').read_text('utf-8'))
last=None
for r in rows:
    im=Image.open(root/r['image'])
    # World-only left-middle crop avoids fixed toolbar, time bar and right info card.
    a=np.asarray(im.crop((72,285,895,640)).resize((160,72)).convert('RGB'),dtype=np.float32)
    r['visual_delta_0_255']=None if last is None else round(float(np.abs(a-last).mean()),4)
    r['world_crop_mean_luma']=round(float((a[:,:,0]*.2126+a[:,:,1]*.7152+a[:,:,2]*.0722).mean()),3)
    last=a
for i,r in enumerate(rows):
    r['pts_gap_ms']=None if i==0 else round((r['pts_seconds']-rows[i-1]['pts_seconds'])*1000,3)
    ms=round(r['pts_seconds']*1000)
    r['timestamp']=f'{ms//60000:02}:{ms//1000%60:02}.{ms%1000:03}'
(root/'frames_manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
dt=[r['pts_gap_ms'] for r in rows if r['pts_gap_ms'] is not None]
summary={'frame_count':len(rows),'display_width':1600,'display_height':720,'source_coded_width':720,'source_coded_height':1600,'rotation_degrees':90,'duration_seconds':30.380111,'source_video_sha256':__import__('hashlib').sha256((Path(__file__).parent/'input'/'Record_2026-11-17-13-36-02.mp4').read_bytes()).hexdigest(),'pts_gap_ms_median':float(np.median(dt)),'pts_gap_ms_min':min(dt),'pts_gap_ms_max':max(dt),'estimated_app_rect_px':[71,71,1512,720],'estimated_app_area_percent':round(1441*649/(1600*720)*100,2),'estimated_info_card_rect_px':[904,226,1496,540],'estimated_info_card_share_of_app_percent':round(592*314/(1441*649)*100,2),'measurement_scope':'Screen recording only; no runtime FPS, GPU, RAM, battery or network conclusions.'}
(root/'measurements.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary))
print('TOP VISUAL DELTAS',[(r['frame_id'],r['timestamp'],r['visual_delta_0_255']) for r in sorted(rows[1:],key=lambda x:x['visual_delta_0_255'],reverse=True)[:12]])
