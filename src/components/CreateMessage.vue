<template>
  <div class="container" style="margin-bottom=30px;">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input type="text" class="form-control" name="message" placeholder="Enter Message" v-model="newMessage">
        <p class="text-danger" v-if="errorText">{{errorText}}</p>
      </div>
      <button class="btn btn-primary" type="submit" name="action">Send</button>
    </form>
  </div>
</template>

<script>
import fb from "@/firebase/init";

export default {
  name: 'CreateMessage',
  props: ['name'],
  data(){
    return{
      newMessage:null,
      errorText:null
    }
  },
  methods:{
    createMessage(){
      if(this.newMessage){
        fb.collection('messages').add({
          message:this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }).catch(function(err){
          throw new Error(err);
        });

        this.newMessage = null;
        this.errorText = null;
      }else{
        this.errorText = 'Message must be entered.';
      }
    }
  }
}
</script>
