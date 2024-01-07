<template>
    <div class="loader"></div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
    data() {
      return {
      }
    },
  
    
  }
  </script>
  
  <style scoped>
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid blue;
    border-right: 16px solid blue;
    border-bottom: 16px solid blue;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
    position: absolute;
    left: 25vw;
    top: 25%;
    transform: translate(-50%, -50%);
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  