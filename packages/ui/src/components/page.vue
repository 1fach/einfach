<script setup lang="ts">
import Card from "./card.vue";
import Gradient from "./gradient.vue";

const LINKS = [
  {
    title: "Docs",
    href: "https://turbo.build/repo/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turbo.build/repo/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turbo.build/repo/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

const props = defineProps<{
  appName: string;
}>();
</script>

<template>
  <main class="main">
    <div class="description">
      <p>
        examples/vue-nuxt&nbsp;
        <code class="code">{{ props.appName }}</code>
      </p>
    </div>


    <div class="grid">
      <Card
        v-for="{ title, href, description } in LINKS"
        class="card"
        :href="href"
        :key="title"
        :title="title"
      >
        {{ description }}
      </Card>
    </div>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

:root {
  --max-width: 1100px;
  --border-radius: 12px;
  --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
    "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
    "Fira Mono", "Droid Sans Mono", "Courier New", monospace;

  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;

  --callout-rgb: 20, 20, 20;
  --callout-border-rgb: 108, 108, 108;
  --card-rgb: 100, 100, 100;
  --card-border-rgb: 200, 200, 200;

  --glow-conic: conic-gradient(
    from 180deg at 50% 50%,
    #2a8af6 0deg,
    #a853ba 180deg,
    #e92a67 360deg
  );
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: "Inter", sans-serif;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

a {
  color: inherit;
  text-decoration: none;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6rem;
  min-height: 100vh;
}

.vercelLogo {
  filter: invert(1);
}

.description {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  font-size: 0.85rem;
  max-width: var(--max-width);
  width: 100%;
  z-index: 2;
  font-family: var(--font-mono);
}

.description a {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.description p {
  position: relative;
  margin: 0;
  padding: 1rem;
  background-color: rgba(var(--callout-rgb), 0.5);
  border: 1px solid rgba(var(--callout-border-rgb), 0.3);
  border-radius: var(--border-radius);
}

.code {
  font-weight: 700;
  font-family: var(--font-mono);
}

.hero {
  display: flex;
  position: relative;
  place-items: center;
}

.heroContent {
  display: flex;
  position: relative;
  z-index: 0;
  padding-bottom: 4rem;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  width: auto;
  font-family: system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  padding-top: 48px;

  @media (min-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 6rem;
  }
  @media (min-width: 1024px) {
    padding-top: 5rem;
    padding-bottom: 8rem;
  }
}

.logos {
  display: flex;
  z-index: 50;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(25%, auto));
  max-width: 100%;
  width: var(--max-width);
}

.card {
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius);
  background: rgba(var(--card-rgb), 0);
  border: 1px solid rgba(var(--card-border-rgb), 0);
  transition:
    background 200ms,
    border 200ms;
}

.card span {
  display: inline-block;
  transition: transform 200ms;
}

.card h2 {
  font-weight: 600;
  margin-bottom: 0.7rem;
}

.card p {
  margin: 0;
  opacity: 0.6;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 30ch;
}

@media (prefers-reduced-motion) {
  .card:hover span {
    transform: none;
  }
}

/* Mobile */
@media (max-width: 700px) {
  .content {
    padding: 4rem;
  }

  .grid {
    grid-template-columns: 1fr;
    margin-bottom: 120px;
    max-width: 320px;
    text-align: center;
  }

  .card {
    padding: 1rem 2.5rem;
  }

  .card h2 {
    margin-bottom: 0.5rem;
  }

  .center {
    padding: 8rem 0 6rem;
  }

  .center::before {
    transform: none;
    height: 300px;
  }

  .description {
    font-size: 0.8rem;
  }

  .description a {
    padding: 1rem;
  }

  .description p,
  .description div {
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
  }

  .description p {
    align-items: center;
    inset: 0 0 auto;
    padding: 2rem 1rem 1.4rem;
    border-radius: 0;
    border: none;
    border-bottom: 1px solid rgba(var(--callout-border-rgb), 0.25);
    background: linear-gradient(
      to bottom,
      rgba(var(--background-start-rgb), 1),
      rgba(var(--callout-rgb), 0.5)
    );
    background-clip: padding-box;
    backdrop-filter: blur(24px);
  }

  .description div {
    align-items: flex-end;
    pointer-events: none;
    inset: auto 0 0;
    padding: 2rem;
    height: 200px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgb(var(--background-end-rgb)) 40%
    );
    z-index: 1;
  }
}

/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    background: rgba(var(--card-rgb), 0.1);
    border: 1px solid rgba(var(--card-border-rgb), 0.15);
  }

  .card:hover span {
    transform: translateX(4px);
  }
}

.circles {
  position: absolute;
  min-width: 614px;
  min-height: 614px;
}

.logo {
  z-index: 50;
  width: 120px;
  height: 120px;
}

.logoGradientContainer {
  display: flex;
  position: absolute;
  z-index: 50;
  justify-content: center;
  align-items: center;
  width: 16rem;
  height: 16rem;
}

.turborepoWordmarkContainer {
  display: flex;
  z-index: 50;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (min-width: 1024px) {
    gap: 1.5rem;
  }
}

.turborepoWordmark {
  width: 160px;
  fill: white;

  @media (min-width: 768px) {
    width: 200px;
  }
}

.code {
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
  font-weight: 700;
}

/* Tablet and Smaller Desktop */
@media (min-width: 701px) and (max-width: 1120px) {
  .grid {
    grid-template-columns: repeat(2, 50%);
  }
}

/* Gradients */
.gradient {
  position: absolute;
  mix-blend-mode: normal;
  will-change: filter;
}

.gradientSmall {
  filter: blur(32px);
}

.gradientLarge {
  filter: blur(75px);
}

.glowConic {
  background-image: var(--glow-conic);
}

.logoGradient {
  opacity: 0.9;
  width: 120px;
  height: 120px;
}

.backgroundGradient {
  top: -500px;
  width: 1000px;
  height: 1000px;
  opacity: 0.15;
}
</style>
