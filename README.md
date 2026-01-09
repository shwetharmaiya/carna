Carna
The Architecture of Carnatic Music.

Carna is a high-fidelity, interactive "Studio" application designed for practitioners and students of Carnatic music. It bridges the gap between ancient musicology and modern UI/UX, providing a unified rack of tools for rhythm, melody, and theoretical exploration.

✨ Key Features
🎹 Swara Pad & Learn Mode
A responsive grid of swara sthanas that adapts to the raga you are currently studying.

Contextual Filtering: Notes that do not belong to a selected raga are dimmed, highlighting the raga's unique scale.

Knowledge Overlay: Toggle "Learn Mode" to reveal the full Sanskrit nomenclature (e.g., Chatushruti Rishabham) for every note.

Sequence Player: Automatically play the Arohanam and Avarohanam to calibrate your pitch.

⏱️ Tāla Metronome
A precision rhythm engine designed for the complexities of Carnatic Talas.

Visual Akshara Tracker: A pulsing bar visualizer to track beats within a cycle.

Preset Talas: Support for Adi, Rupaka, and Misra Chapu with Samam-weighted audio clicks.

🗺️ Melakarta Chakra Map
An artistic, interactive SVG visualization of the 72 Melakarta raga system.

Theoretical Navigation: Explore the 12 Chakras (Indu, Netra, etc.) and their parent ragas.

Blueprint Aesthetic: A mathematical representation of the architectural beauty of the system.

🎼 Raga Explorer
A searchable database of parent and janya ragas.

Deep Integration: View scale notations and jump directly to curated YouTube recordings of classic compositions.

Studio Rack Design: All tools are unified within a "Modern Temple" aesthetic (Deep Charcoal & Saffron).

🛠️ Tech Stack
Framework: Next.js 14/15 (App Router)

Styling: Tailwind CSS 3.4+

State Management: React Hooks (useRef for low-latency AudioContext)

Audio Engine: Web Audio API (Native oscillators for lag-free practice)

Themes: next-themes for seamless Dark/Light mode transitions