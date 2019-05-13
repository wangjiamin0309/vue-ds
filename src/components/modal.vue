<template>
	 <div>
      <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShows}">
        <div class="md-modal-inner">
          <div class="md-top">
            <button class="md-close" @click="closeMD">Close</button>
          </div>
          <div class="md-content">
            <div class="confirm-tips">
                <slot name="message"></slot>
            </div>
            <div class="btn-wrap" >
                <slot name="btnGroup" ></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay"  v-if="mdShows"></div>
    </div>
</template>

<script>
export default{
	props:{
		mdShows:Boolean
	},
	methods:{
		closeMD(){
			this.$emit('closeMD')
		}
	}
}
</script>

<style>
</style>