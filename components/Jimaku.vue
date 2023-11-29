<template>
    <div class="full">
        <div class="glass">
            <p id="typewriter-text03">{{ telop1 }}</p>
        </div>
    </div>
</template>

<script>
import text from 'raw-loader!@/assets/music/default.txt'
import hello from 'raw-loader!@/assets/music/hello.txt'
export default {
  name: 'IndexPage',
  data() {
    return {
      telop: "はろはろー！私はコスギ・ルビー！Gravityという電脳世界から、こっちの現実世界へやってきたの！",
      textDOM: $('#typewriter-text03'),
      delay: 75,
      index: 0
    }
  },
  methods: {

  }
}
</script>

<style>

.full {
    padding-top: 50px;
    width: 100%;
}

.glass {
  width: 100%;
  max-width: 600px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.1); /* 背景色 */
  border: 1px solid rgba(255, 255, 255, 0.4); /* ボーダー */
  border-right-color: rgba(255, 255, 255, 0.2);
  border-bottom-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  -webkit-backdrop-filter: blur(20px); /* ぼかしエフェクト */
  backdrop-filter: blur(20px);
  box-shadow: 0 5px 20px rgba(194, 181, 171, 0.5); /* 薄い影 */
  margin: 0 auto;
}

/* ガラス内の要素 */
.glass h1 {
  text-align: center;
  color: #fff;
  font-family: "Heebo", sans-serif;
  font-size: 50px;
  font-weight: bold;
  letter-spacing: 0.06em;
}

.glass p {
  margin-top: 20px;
  color: #fff;
  font-size: 23px;
  text-align: center;
}

#typewriter-text03 {
  color: #333;
}
#typewriter-text03::after {
  content: "|";
  animation: blink 1s infinite;
}
</style>