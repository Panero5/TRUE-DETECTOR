# Audio analysis validation

## Current limitations
The browser decodes audio and measures amplitude, quiet intervals and abrupt level changes. These are not evidence of deception, editing or synthetic speech. Decoded sample rate is not necessarily the original sample rate.

## Acceptance tests
- WhatsApp Opus/OGG, M4A, MP3 and WAV: import, playback, duration and analysis on Android Chrome.
- Silence and low-volume speech: no manipulation verdict.
- Natural pauses and abrupt speech onset: no manipulation verdict.
- Corrupt or unsupported files: actionable error, no fabricated report.
- Repeated file selection: no stale results or retained object URLs.
- Long compressed files: enforce decoded duration and memory budget before expensive analysis where feasible.

## Next implementation: transcription
Evaluate local multilingual Whisper-compatible inference on Android (Spanish, English, German, French). Measure download size, latency, memory, accuracy and offline behavior on OPPO Reno 10. Do not silently upload audio. Browser microphone speech recognition is not a reliable substitute for transcription of imported files.

## Synthetic voice detection
Evaluate separately on real and synthetic speech, including WhatsApp recompression, multiple languages and unseen generators. Report uncertainty and abstain when evidence is insufficient. Never infer truthfulness from vocal characteristics.

## Release gate
No advanced detection claim until validated. No paid dependency without approval. No real user audio in the public repository.
