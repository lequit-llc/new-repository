<template>
  <div class="body">
    <div class="click" @click="start()" v-if="init_btn">
      <h1 class="screen_click">画面をクリックしてください。</h1>
    </div>
    <Jimaku v-if="!init_btn" ref="tlp" />
  </div>
</template>

<style>

.body {
    background-image: url('@/assets/images/summer.jpeg');
    width: 100%;
    height: 100vh;
}


.click{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 1;
    backdrop-filter: blur(12px);
}

.click:hover {
  cursor: pointer;
}

.screen_click{
  background-color: #fff;
  display: block;
  text-align: center;
  margin-top: 15%;
  font-size: 50px;
}

canvas {
  filter: blur(10px);
}
</style>

<script>
import text from 'raw-loader!@/assets/music/default.txt'
import hello from 'raw-loader!@/assets/music/hello.txt'
export default {
  name: 'IndexPage',
  head () {
    return {
      script: [
        {
          src: 'bundle.js',
        }
      ]
    }
  },
  data() {
    return {
      init_btn: true
    }
  },

  methods: {
    start() {
      $('.click').fadeOut(300)
      $('canvas').css('filter','blur(0px)')
      this.init_btn = false

      let audio = new Audio(`data:audio/wav;base64,${text}`)
      audio.play()
      console.log('playmusic')
      this.init_speak()
    },
    init_speak() {
      setTimeout(() => {
        let url = `data:audio/wav;base64,${hello}`;
        let audio = new Audio(url)
        audio.play()
        this.buffer(url).then((peaksArr) => { //2500
            let count = 0
            let TimerID = setInterval(() => {
                if (count < peaksArr[0].length) {
                    changevalue.change_value((peaksArr[0][count]*10))
                    count++
                } else {
                    console.log('cleared')
                    clearInterval(TimerID)
                }
            }, 1/60);
            changevalue.change_value(NaN)
        }).catch((err) => {
            console.error(err)
        })
      }, 4000);
    },
    buffer(url,peakLength) {
        const promise = new Promise((resolve,reject) => {
            const request = new XMLHttpRequest()
            request.open('GET',url,true)
            request.responseType = 'arraybuffer'
            request.onload = () => {
                if (request.status == 200){
                    this.onLoadSound(request.response, resolve, reject)
                } else {
                    reject(request.statusText)
                }
            }
            request.send()
        })

        return promise
    },
    onLoadSound(audioData, resolve, reject) {
        const context = new AudioContext();
        context.decodeAudioData(audioData).then((buffer) => {
            const duration = buffer.duration
            // duration * x = 2500
            console.log(duration * 250)
            const ch1 = buffer.getChannelData(0)
            const peaks1 = this.getPeaks(ch1, duration * 250);

            const ch2 = buffer.getChannelData(0)
            const peaks2 = this.getPeaks(ch2, duration * 250);

            resolve([peaks1, peaks2]);
        
        }).catch((err) => {
            reject(err)
        })
    },
    getPeaks(array, peakLength){
        let step;
        if(!peakLength){
            peakLength = 9000;
        }

        step = Math.floor(array.length / peakLength);

        if (step < 1) { 
            step = 1;
        }

        let peaks = [];
        for(let i = 0, len = array.length; i < len; i += step){
            const peak = this.getPeak(array, i, i + step);
            peaks.push(peak);
        }
        return peaks;
    },
    getPeak(array,startIndex,endIndex){
        const sliced = array.slice(startIndex,endIndex)
        let peak = -100
        for (let i = 0; i < sliced.length; i++){
            const sample = sliced[i]
            if (sample > peak) {
                peak = sample
            }
        }
        return peak
    }
  }
}
</script>
