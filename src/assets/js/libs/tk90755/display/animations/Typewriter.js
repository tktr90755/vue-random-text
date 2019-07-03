/**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.display.animations.Typewriter.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
import TypewriterEvent from '@/assets/js/libs/tk90755/events/TypewriterEvent.js'
import Typewriter from '@/assets/js/libs/tk90755/display/animations/Typewriter.js'

var typewriter = new Typewriter(this.text,"HOGWUHFOWHF");
let typeStartHandler =(e)=>{
  console.log("始まったよ: " + typewriter.currentText);
}
let typeUpdateHandler =(e)=>{
  console.log("タイプ中: " + typewriter.currentText);
}
let typeCompleteHandler =(e)=>{
  console.log("終わったよ: " + typewriter.currentText);
}
typewriter.addEventListener (TypewriterEvent.TYPE_START, typeStartHandler);
typewriter.addEventListener (TypewriterEvent.TYPE_UPDATE, typeUpdateHandler);
typewriter.addEventListener (TypewriterEvent.TYPE_COMPLETE, typeCompleteHandler);

//もしくは

let typewriter = new Typewriter('aafwrara')
let onInit =()=>{
  this.myText = typewriter.currentText;
  console.log("始まったよ: " + typewriter.currentText);
}
let onUpdate =()=>{
  this.myText = typewriter.currentText;
  console.log("タイプ中: " + typewriter.currentText);
}
let onComplete =()=>{
  this.myText = typewriter.currentText;
  console.log("終わったよ: " + typewriter.currentText);
}
typewriter.onInit = onUpdate;
typewriter.onUpdate = onInit;
typewriter.onComplete = onComplete;

 */
/**
 * @class Player
 */
import TypewriterEvent from '@/assets/js/libs/tk90755/events/TypewriterEvent.js'
import EventDispatcher from '@/assets/js/libs/tk90755/events/EventDispatcher.js'
import Ticker from '@/assets/js/libs/tk90755/display/Ticker.js'
export default class Typewriter extends EventDispatcher{

  constructor(caption, kind, isExcure) {
    super();

    if(kind === undefined || kind === ''){
      kind = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if(isExcure === undefined){
      isExcure = true
    }

    this._id = new Date().getTime().toString(16)  + Math.floor(1000000 * Math.random()).toString(16);
		//ランダム中のテキスト
		this._kind = kind;
		//タイピングするスピード
		this.TYPEING_SPEED = 0.01;
		//なにをタイピングするか
		this._caption = caption;
		//タイピングするカウント
		this.count = 0;
		//経過時間
		this.currentTime = 0;
		//実際にタイピングするまでの遅延
		this.delay = 10;
		//ランダム中のテキストのながさ
		this.kindLength;
		//最初に一回だけ実行する判定
		this.once = false;
    this._currentText = ""
    this.kindLength = this._kind.length;

    this._onInit = undefined;
    this._onUpdate = undefined;
    this._onComplete = undefined;

    if(isExcure === true){
      this.excute();
    }
  }

  //__________________________________________________________________________________
  // methods 
  _render=()=>{
    //タイピング始め
    if (this.once == false){
      this.once = true;
      this.dispatchEvent(new TypewriterEvent(TypewriterEvent.TYPE_START));
      if(this._onInit !== undefined) this._onInit();
    }
    //表示するテキストの長さ
    let textLength = this._caption.length;
    //現在タイピングしている個数
    let currentType = Math.max(this.count - this.delay, 0);
    //テキストフィールドに代入するためのStringを抽出
    let pickUpText = this._caption.substring(0, currentType)
    //ランダムなタイピング
    let randomType = "";
    //タイピングする上限
    let rimitType = Math.min(this.count, textLength);
    //現在タイピングした個数
    let currentTyped = currentType;
    //タイプ途中なら実行
    while (currentTyped++ < rimitType)
    {
      if (currentTyped == rimitType-- && rimitType < textLength)
      {
        //タイプ中ならケツにアンダースコアつける
        randomType = randomType + "_";
        continue;
      }
      //違うならただのランダム
      randomType = randomType + this._kind.charAt(Math.floor(Math.random() * this.kindLength));
    }
    //テキストフィールドに代入
    this._currentText = pickUpText + randomType;
    if (new Date().getTime() > this.currentTime + this.TYPEING_SPEED * 1000)
    {
      //カウントアップ
      this.count++;
    }
    //タイピング中
    this.dispatchEvent(new TypewriterEvent(TypewriterEvent.TYPE_UPDATE));
    if(this._onUpdate !== undefined) this._onUpdate();
    //タイピング終わり
    if (currentType > textLength--)
    {
      //停止
      Ticker.kill('typing_' + this._id, false)
      //タイピング終わり
      this.dispatchEvent(new TypewriterEvent(TypewriterEvent.TYPE_COMPLETE));
      if(this._onComplete !== undefined) this._onComplete();
      //最初に一回だけ実行する判定をリセット
      this.once = false;
    }
  }

  excute(){
    if (Ticker.hasItem('typing_' + this._id)){
      Ticker.kill('typing_' + this._id, false)
    }
    //カウントを初期化
    this.count = 0;
    //経過時間
    this.currentTime = new Date().getTime();
    //実行
    Ticker.add(this._render, 'typing_' + this._id, false)
  }
  
  kill(){
    if (Ticker.hasItem('typing_' + this._id)){
      Ticker.kill('typing_' + this._id, false)
    }
    this._currentText = '';
  }

  //__________________________________________________________________________________
  // getter / setter
  get id(){
    return this._id;
  }

  get currentText(){
    return this._currentText;
  }

  get caption(){
    return this._caption;
  }

  set caption(v){
    this._caption = v;
  }

  set onInit(v){
    this._onInit = v;
  }

  set onUpdate(v){
    this._onUpdate = v;
  }

  set onComplete(v){
    this._onComplete = v;
  }
}
