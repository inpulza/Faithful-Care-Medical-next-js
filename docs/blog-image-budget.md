# Image generation budget

Faithful Care shares 36 image credits per one-hour window between manual images and Auto Generate. A window starts with its first admission, not at the top of the clock hour. Auto Generate reserves three credits before any paid text requests, allowing up to 12 complete runs per hour if no individual images consume credits. Its separate start throttle allows 12 attempts per hour.

Existing consumption and reset timestamps are preserved when this increase deploys. Reservations remain usable for 24 hours; cancellation does not refund credits. The quota measures admission/reservation, not successful image delivery. English and Spanish share the same generated images.

Verification covers individual and complete-run boundaries, simultaneous reservations, manual/automatic contention, expiry, duplicate requests, and preserving existing consumption. Browser coverage checks the explicit 36-per-hour error and safe retry on desktop and mobile with simulated providers.
