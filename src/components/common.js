const enums= {
  toCH: {
    'Jan': "一月",
    'Feb': "二月",
    'Mar': "三月",
    'Apr': "四月",
    'May': "五月",
    'Jun': "六月",
    'Jul': "七月",
    'Aug': "八月",
    'Sept': "九月",
    'Oct': "十月",
    'Nov': "十一月",
    'Dec': "十二月"
  },
  toEN: {
    '1': 'Jan',
    '2': 'Feb',
    '3': 'Mar',
    '4': 'Apr',
    '5': 'May',
    '6': 'Jun',
    '7': 'Jul',
    '8': 'Aug',
    '9': 'Sept',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  }
}

class item{

}

const fakeContent=[
  {month:"Jan",
    content:[
      {date:"2023/1/25",
        location:"上海",
        type:"richText",
        source:"myself",
        diary:"晴朗。"}
    ]},
  {month:"Feb",
    content:[
      {date:"2023/1/25",
        location:"上海",
        type:"richText",
        source:"myself",
        diary:"<p>first</p>"}
    ]},
]

export {enums,fakeContent}
