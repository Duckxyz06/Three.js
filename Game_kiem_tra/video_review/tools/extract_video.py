from pathlib import Path
import subprocess, json, csv, hashlib
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent
SOURCE=ROOT/'input'/'Record_2026-11-17-13-36-02.mp4'
OUT=ROOT/'University_Map_Simulator_Review'
FRAMES=OUT/'frames'
SHEETS=OUT/'contact_sheets'
FRAMES.mkdir(parents=True, exist_ok=True)
SHEETS.mkdir(parents=True, exist_ok=True)

def probe(*args):
    return json.loads(subprocess.check_output(['ffprobe','-v','error',*args,'-of','json',str(SOURCE)],encoding='utf-8'))
meta=probe('-show_format','-show_streams')
pts=probe('-select_streams','v:0','-show_frames','-show_entries','frame=best_effort_timestamp_time,pkt_duration_time,key_frame,pict_type')['frames']
(OUT/'video_metadata.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf-8')
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(SOURCE),'-map','0:v:0','-fps_mode','passthrough','-q:v','4',str(FRAMES/'frame_%06d.jpg')],check=True)
paths=sorted(FRAMES.glob('frame_*.jpg'))
assert len(paths)==len(pts),(len(paths),len(pts))
rows=[]
def timestamp(t):
    return f'{int(t)//60:02}:{int(t)%60:02}.{int(round((t-int(t))*1000)):03}'
for i,(path,pt) in enumerate(zip(paths,pts),1):
    t=float(pt.get('best_effort_timestamp_time',0))
    rows.append({'frame_id':f'F{i:06d}','frame_number':i,'pts_seconds':t,'timestamp':timestamp(t),'image':f'frames/{path.name}','analysis':f'frame_analysis/frame_{i:06d}.md','key_frame':pt.get('key_frame',0),'picture_type':pt.get('pict_type',''),'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
(OUT/'frames_manifest.json').write_text(json.dumps(rows,indent=2),encoding='utf-8')
with (OUT/'frames_manifest.csv').open('w',newline='',encoding='utf-8-sig') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
def contact(indices,name,cols=4):
    tw,th=400,180
    band=28
    canvas=Image.new('RGB',(cols*tw,((len(indices)+cols-1)//cols)*(th+band)),(24,29,40))
    d=ImageDraw.Draw(canvas)
    for j,idx in enumerate(indices):
        im=Image.open(paths[idx]); im.thumbnail((tw,th))
        x=(j%cols)*tw;y=(j//cols)*(th+band)
        canvas.paste(im,(x+(tw-im.width)//2,y+(th-im.height)//2))
        d.text((x+8,y+th+4),f'{rows[idx]["frame_id"]} | {rows[idx]["timestamp"]}',font=font,fill='white')
    canvas.save(SHEETS/name,quality=91)
overview=[]
for sec in range(31):
    overview.append(min(range(len(rows)),key=lambda k:abs(rows[k]['pts_seconds']-sec)))
contact(sorted(set(overview)),'overview_1_second.jpg')
for page,start in enumerate(range(0,len(paths),48),1):
    contact(list(range(start,min(start+48,len(paths)))),f'all_frames_{page:02d}.jpg',cols=6)
print(json.dumps({'frames':len(paths),'duration':meta['format']['duration'],'first_image':str(paths[0]),'overview':str(SHEETS/'overview_1_second.jpg'),'jpeg_total_bytes':sum(p.stat().st_size for p in paths),'output':str(OUT)}))
