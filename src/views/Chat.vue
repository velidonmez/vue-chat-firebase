<template>
  <div class="container chat">
    <h2 class="text-center text-primary">Real-Time Chat</h2>
    <h5 class="text-center text-secondary">With Vue.js and Firebase</h5>
    <div class="card">
      <div class="card-body">
        <p
          class="text-secondary nomessages"
          v-if="messages.length === 0"
        >There are no messages to show.</p>
        <div class="messages">
          <div v-for="message in messages" :key="message.id">
            <span class="text-info">[{{message.name}}] </span>
            <span>{{message.message}}</span>
            <span class="text-secondary time">{{message.timestamp}}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name"/>
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from '@/components/CreateMessage';
import fb from '@/firebase/init';
import moment from 'moment';

export default {
  name: 'Chat',
    props: ['name'],
    components: {
        CreateMessage
    },
    data() {
        return {
            messages: []
        }
    },
  created(){
    let ref = fb.collection('messages').orderBy('timestamp');
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach((change,i) => {
        if (change.type == 'added') {
          let doc = change.doc.data();
          
          this.messages[i] = {
            id: change.doc.id,
            name: doc.name,
            message: doc.message,
            timestamp: moment(doc.timestamp).format('LTS')
          }
        }
      });
    });
    console.log(this.messages);
  }  
}
</script>

<style scoped>
  .chat h2{
      font-size: 2.6em;
      margin-bottom: 0px;
  }
  .chat h5{
      margin-top: 0px;
      margin-bottom: 40px;
  }
  .chat span{
      font-size: 1.2em;
  }
  .chat .time{
      display: block;
      font-size: 0.7em;
  }
  .messages{
      max-height: 300px;
      overflow: auto;
  }
</style>
