module.exports = {
  data() {
    
  },
  props: {
    // 背景颜色
    backgroundColor: {
      type: String,
      default: ''
    },
    // 字体颜色
    fontColor: {
      type: String,
      default: ''
    },
    // 字体大小
    fontSize: {
      type: Number,
      default: 0
    },
    // 字体大小单位
    fontUnit: {
      type: String,
      default: 'rpx'
    }
  },
  computed: {
    backgroundColorStyle() {
      return this.$t.color.getBackgroundColorStyle(this.backgroundColor)
    },
    backgroundColorClass() {
      return this.$t.color.getBackgroundColorInternalClass(this.backgroundColor)
    },
    fontColorStyle() {
      return this.$t.color.getFontColorStyle(this.fontColor)
    },
    fontColorClass() {
      return this.$t.color.getFontColorInternalClass(this.fontColor)
    },
    fontSizeStyle() {
      return this.$t.string.getLengthUnitValue(this.fontSize, this.fontUnit)
    }
  },
  methods: {
    
  }
}