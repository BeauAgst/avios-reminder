<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="61"
    key-field="external_id"
    v-slot="{ item }"
  >
    <div class="scroller__item">
      <div class="scroller__item-inner" @click="onClick(item)">
        <div>
          <div>{{ item.merchant_url }}</div>
          <div class="small--text">{{ item.rate }}</div>
        </div>
        <div class="scroller__link" title="Check out deal">
          <div class="arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004"><path fill="currentColor" d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"/></svg>
          </div>
        </div>
      </div>
    </div>
  </RecycleScroller>
</template>

<script>
export default {
  props: {
    list: Array,
  },
  methods: {
    onClick(item) {
      chrome.runtime.sendMessage({ type: 'url', url: this.href(item) })
    },
    href({ merchant: { merchant_name_id } }) {
      return `https://www.shopping.ba.com/retailers/${merchant_name_id}`
    }
  }
}

</script>

<style scoped>
.scroller {
  height: 100%;
}

.scroller__item {
  margin-bottom: .5em;
}

.scroller__item-inner {
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5em .75em;
  background-color: #fff;
  border-radius: .5em;
  border: 1px solid rgba(0,0,0,.2);
}

.scroller__item-inner:hover {
  background-color: #f7f7f7;
}

.scroller__link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #F5B121;
}

.merchant {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

.small--text {
  margin-top: 2px;
  font-weight: bold;
  font-size: 14px;
}

.arrow {
  width: 15px;
  height: 15px;
  color: #fff;
}
</style>