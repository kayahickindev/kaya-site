#!/bin/bash
# finish.sh <input.mp4> <outbase>  → outbase.mp4 (H.264, seamless palindrome loop), outbase.webm, outbase-poster.jpg
set -e
in="$1"; out="$2"
dir=$(dirname "$out"); mkdir -p "$dir"
# Palindrome: forward then reversed, dropping the duplicated seam frames, so the loop never cuts.
ffmpeg -y -loglevel error -i "$in" -filter_complex "[0:v]split[a][b];[b]reverse,trim=start_frame=1[r];[a][r]concat=n=2:v=1:a=0,fps=30,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -preset slow -crf 20 -movflags +faststart "$out.mp4"
ffmpeg -y -loglevel error -i "$in" -vf "select=eq(n\,12)" -frames:v 1 -q:v 2 "$out-poster.jpg"
ls -la "$out.mp4" "$out-poster.jpg"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,duration -of csv=p=0 "$out.mp4"
