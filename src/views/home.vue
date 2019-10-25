<template>
  <div>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel
        v-for="(item, index) in tabs"
        :label="item.label"
        :key="item.label"
      >
        <ul class="ul">
          <TodoList v-if="item.component === 'TodoList'"></TodoList>
          <Center v-if="item.component === 'Center'"></Center>
        </ul>
      </cube-tab-panel>
    </cube-tab-panels>
    <cube-tab-bar
      v-model="selectedLabel"
      show-slider
    >
      <cube-tab
        v-for="(item, index) in tabs"
        :icon="item.icon"
        :label="item.label"
        :key="item.label"
      >
      </cube-tab>
    </cube-tab-bar>
  </div>

</template>

<script>
import TodoList from '../components/TodoList'
import Center from '../components/Center'
export default {
  components: {
    TodoList,
    Center
  },
  data () {
    return {
      selectedLabel: '代办',
      tabs: [{
        label: '代办',
        icon: 'cubeic-like',
        component: 'TodoList'
        // heroes: ['敌法师', '卓尔游侠', '主宰', '米拉娜', '变体精灵', '幻影长矛手', '复仇之魂', '力丸', '矮人狙击手', '圣堂刺客', '露娜', '赏金猎人', '熊战士']
      }, {
        label: '个人中心',
        icon: 'cubeic-star',
        component: 'Center'
        // heroes: ['血魔', '影魔', '剃刀', '剧毒术士', '虚空假面', '幻影刺客', '冥界亚龙', '克林克兹', '育母蜘蛛', '编织者', '幽鬼', '司夜刺客', '米波']
      }]
      // selectedLabelDefault: 'Vip',
      // tabs: [{
      //   label: 'Home',
      //   icon: 'cubeic-home'
      // }, {
      //   label: 'Like',
      //   icon: 'cubeic-like'
      // }, {
      //   label: 'Vip',
      //   icon: 'cubeic-vip'
      // }, {
      //   label: 'Me',
      //   icon: 'cubeic-person'
      // }]
    }
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    }
  }
}
</script>
<style lang="scss" scoped>
.ul {
  height: 100%;
  width: 100%;
}
</style>



