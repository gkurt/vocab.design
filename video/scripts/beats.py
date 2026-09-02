"""Measure a track's tempo and where its beats fall, for reel.json.

    bun run beats public/music/track.mp3

Prints JSON: the BPM, the time of the first detected beat (the `downbeat` the edit
starts from), and every beat time. Tempo detection halves or doubles now and then, so
compare the printed BPM with what your foot says before pasting it in.
"""

import json
import sys

import librosa
import numpy as np

path = sys.argv[1]
y, sr = librosa.load(path, mono=True)
tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units="time", trim=False)
tempo = float(np.atleast_1d(tempo)[0])
onset = librosa.onset.onset_strength(y=y, sr=sr)
# The first beat librosa tracks is often a weak one; report the first beat whose onset is
# at least half the loudest, which is where a listener hears the track start.
frames = librosa.time_to_frames(beats, sr=sr)
strength = onset[np.clip(frames, 0, len(onset) - 1)]
loud = beats[strength >= 0.5 * strength.max()]
print(
    json.dumps(
        {
            "file": path,
            "duration": round(float(librosa.get_duration(y=y, sr=sr)), 2),
            "bpm": round(tempo, 2),
            "downbeat": round(float(loud[0] if len(loud) else beats[0]), 3),
            "beats": [round(float(b), 3) for b in beats],
        }
    )
)
