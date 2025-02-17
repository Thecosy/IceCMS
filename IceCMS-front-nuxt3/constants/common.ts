export class COMMON_STATUS {
    static readonly true = 1 // 启用
    static readonly false = 2 // 停用
  
    static readonly options = [
      { value: this.true, label: '启用', type: 'success' },
      { value: this.false, label: '停用', type: 'info' }
    ]
  }
  