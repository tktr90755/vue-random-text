<template>
  <p @mouseenter="hover">{{myText}}</p>
</template>

<script>
import TypewriterEvent from '@/assets/js/libs/tk90755/events/TypewriterEvent.js'
import Typewriter from '@/assets/js/libs/tk90755/display/animations/Typewriter.js'

export default {
  props: {
    text: String,
    kind: String
  },
  data: function () {
    return {
      myText: ''
    }
  },
  mounted() {
    this.myText = this.text;
    this.excute();


  },
  methods: {
    hover: function(event) {
      this.excute()
    },
    excute(){
      let typewriter = new Typewriter(this.text, this.kind)
      let onInit =()=>{
        this.myText = typewriter.currentText;
        console.log("onInit: " + typewriter.currentText);
      }
      let onUpdate =()=>{
        this.myText = typewriter.currentText;
        console.log("onUpdate: " + typewriter.currentText);
      }
      let onComplete =()=>{
        this.myText = typewriter.currentText;
        console.log("onComplete: " + typewriter.currentText);
      }
      typewriter.onInit = onUpdate;
      typewriter.onUpdate = onInit;
      typewriter.onComplete = onComplete;
    }
  }
};
</script>
<style scoped>

</style>
