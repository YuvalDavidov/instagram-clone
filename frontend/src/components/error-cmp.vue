<template>
      <p class="error-message">{{ message }}</p>
  </template>
  
  <script>
  export default {
    props: {
        message: {
            type: String,
            required: true
        }
    },
    created() {
        console.log('sssssssssssssssssss',this.props)

    }
  }
  </script>
  
  <style scoped>
  .error-message {
    animation: dance 1s infinite;
    font-weight: bold;
    font-size: small;
    color: red;
    max-height: 10px;
  }
  
  @keyframes dance {
    0% { transform: translateY(0px); }
    12% { transform: translateY(-1px); }
    25% { transform: translateY(-2px); }
    
  }
  </style>