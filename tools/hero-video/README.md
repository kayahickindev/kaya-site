# Hero video pipeline

Still first, then video anchored to the still. The OpenAI key is resolved
in-process (`OPENAI_API_KEY`, else Secret Manager through gcloud); it never prints.

```bash
python3 tools/hero-video/img.py "<still prompt>" still.png          # gpt-image-1, 1536x1024
python3 tools/hero-video/oa.py create-ref sora-2-pro 12 1792x1024 still.png "<motion prompt>"
python3 tools/hero-video/oa.py wait <video_id>
python3 tools/hero-video/oa.py download <video_id> raw.mp4
tools/hero-video/finish.sh raw.mp4 public/hero/system                # palindrome loop, libx264, poster
```
