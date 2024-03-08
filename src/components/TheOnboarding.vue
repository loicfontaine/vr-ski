<script setup>
import { ref } from "vue";

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (
    AFRAME.utils.device.checkHeadsetConnected() &&
    !AFRAME.utils.device.isMobile()
  ) {
    document.querySelector("a-scene").enterVR();
  }
}
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div>
      <h1>Course à ski</h1>
      <p>
        Bienvenue dans la course à ski. Passez par toutes les portes le plus
        rapidement possible !
      </p>

      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Jouer</button>
      <div class="licences">
        <section>
          <h4>Comment jouer ? (Ordre de recommandation)</h4>
          <ul>
            <li>
              Casque VR – Poussez avec les bâtons pour avancer et freinez en
              appuyant sur la gachette
            </li>
            <li>
              Ordinateur – W pour avancer et S pour freiner (ou lesflèches
              directionnelles)
            </li>
            <li>Téléphone – 1x tap pour avancer</li>
          </ul>
        </section>
        <dl>
          <dt>
            <i>Inclus</i>
          </dt>
          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank"
              >aframe-extras controls and animation-mixer</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank"
              >aframe physx</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href="https://github.com/jure/aframe-blink-controls/"
              target="_blank"
              >aframe-blink-controls</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate"
              target="_blank"
              >simple-navmesh-constraint</a
            >
          </dt>
          <dd>Par Ada Rose Cannon sous MIT License</dd>
          <dt>
            <a href="https://skfb.ly/6XpXz" target="_blank">Scoreboard model</a>
          </dt>
          <dd>
            Par
            <a href="https://sketchfab.com/nyu_grad_alley_2020" target="_blank"
              >nyu_grad_alley_2020</a
            >
            sous
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>
          <dt>
            <a href="https://skfb.ly/owRsW" target="_blank">Rock model</a>
          </dt>
          <dd>
            Par
            <a href="https://sketchfab.com/mustafa255kw" target="_blank"
              >i like make models</a
            >
            sous
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>
          <dt>
            <a href="https://skfb.ly/6QZCU" target="_blank">Dancing penguin</a>
          </dt>
          <dd>
            Par
            <a href="https://sketchfab.com/twilighthall83" target="_blank"
              >twilighthall83</a
            >
            sous
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://skfb.ly/6YrNs" target="_blank">Tree model</a>
          </dt>
          <dd>
            Par
            <a href="https://sketchfab.com/gamer0k" target="_blank">gamer0k</a>
            sous
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://skfb.ly/6pMLS" target="_blank">Ski model</a>
          </dt>
          <dd>
            Par
            <a href="https://sketchfab.com/grimren13" target="_blank"
              >grimren13</a
            >
            sous
            <a
              href="http://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              >CC BY-NC 4.0</a
            >
          </dd>

          <dt>
            <a
              href="https://stock.adobe.com/fr/search/3d-assets?filters%5Bcontent_type%3Aphoto%5D=0&filters%5Bcontent_type%3Aillustration%5D=0&filters%5Bcontent_type%3Azip_vector%5D=0&filters%5Bcontent_type%3Avideo%5D=0&filters%5Bcontent_type%3Atemplate%5D=0&filters%5Bcontent_type%3A3d%5D=1&filters%5Bcontent_type%3Aaudio%5D=0&filters%5Bfetch_excluded_assets%5D=1&filters%5Binclude_stock_enterprise%5D=1&filters%5Bcontent_type%3Aimage%5D=0&k=ski+pole&order=relevance&safe_search=1&limit=100&search_type=usertyped&search_page=1&acp=&aco=ski+pole&get_facets=0&asset_id=248239871"
              target="_blank"
              >Pole model</a
            >
          </dt>
          <dd>
            Par
            <a
              href="https://stock.adobe.com/fr/contributor/207140330/francesco-milanese?load_type=author&prev_url=detail"
              target="_blank"
              >Francesco Milanese</a
            >
            sous
            <a
              href="https://stock.adobe.com/fr/enterprise-conditions"
              target="_blank"
              >Adobe Education license</a
            >
          </dd>

          <dt>
            <a
              href="https://opengameart.org/content/come-on-dance"
              target="_blank"
              >Victory music</a
            >
          </dt>
          <dd>
            Par
            <a href="https://opengameart.org/users/fluffclipse" target="_blank"
              >fluffclipse</a
            >
            sous
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >CC 1.0</a
            >
          </dd>

          <dt>
            <a href="https://opengameart.org/content/applause" target="_blank"
              >Applause sound</a
            >
          </dt>
          <dd>
            Par
            <a href="https://opengameart.org/users/leezh" target="_blank"
              >LeeZH</a
            >
            sous
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              >CC BY 3.0</a
            >
          </dd>

          <dt>
            <a
              href="https://www.textures.com/download/PBR0172/133207"
              target="_blank"
              >Snow texture</a
            >
          </dt>
          <dd>
            Par
            <a href="https://www.textures.com/" target="_blank">Textures.com</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}
a {
  color: #eee;
  text-decoration: none;
}
.licences {
  margin: 2rem 0;
  font-size: 1rem;
  text-align: left;
}
.licences dt {
  padding-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.licences dd {
  margin-left: 0;
  font-size: 0.8rem;
}

#onboarding {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #333;
  color: #ccc;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  font-family: monospace;
  z-index: 10000;
  overflow: auto;
}
#onboarding > * {
  margin: 0 auto;
  max-width: 50rem;
  width: calc(100vw - 10rem);
  text-align: center;
  border-radius: 0.3rem;
  padding: 1rem;
  font-size: 1.3rem;
}
#onboarding button {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
}
</style>
#onboarding li { #onboarding li { font-size: 1rem; text-align: left; }
