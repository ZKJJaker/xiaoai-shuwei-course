/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
 async function scheduleTimer({
    providerRes,
    parserRes
  } = {}) {
    // 支持异步操作 推荐await写法
  
  //因为课时时间是固定的所以直接写死了
  // 可以根据当前时间判断是春秋那个季节的时间表
  // 秋季  目前也只知道秋季。。。。
  var nowMonth = new Date().getMonth();
  // 八月之前算春季学期 不可能到八月还上学吧
  let sectionTimes;
  // sections: [{
  //   section: 1, // 节次：[1, 30]之间的整数
  //   startTime: '08:00', // 开始时间：参照这个标准格式5位长度字符串
  //   endTime: '08:50', // 结束时间：同上
  // }], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  if(nowMonth<=8||nowMonth>=2){
    sectionTimes = [{"section": 1,"startTime": "08:00","endTime": "08:50"},
                  {"section": 2,"startTime": "09:00","endTime": "09:50"},{"section": 3,"startTime": "10:10","endTime": "11:00"},
                  {"section": 4,"startTime": "11:10","endTime": "12:00"},{"section": 5,"startTime": "14:00","endTime": "14:50"},
                  {"section": 6,"startTime": "15:00","endTime": "15:50"},{"section": 7,"startTime": "16:10","endTime": "17:00"},
                  {"section": 8,"startTime": "17:10","endTime": "18:00"},{"section": 9,"startTime": "19:00","endTime": "19:50"},
                  {"section": 10,"startTime": "20:00","endTime": "20:50"}]
  }else{
  //   八月之后是秋季学期 好像有时候要到1月
    sectionTimes = [{"section": 1,"startTime": "08:00","endTime": "08:50"},
                  {"section": 2,"startTime": "09:00","endTime": "09:50"},{"section": 3,"startTime": "10:10","endTime": "11:00"},
                  {"section": 4,"startTime": "11:10","endTime": "12:00"},{"section": 5,"startTime": "14:00","endTime": "14:50"},
                  {"section": 6,"startTime": "15:00","endTime": "15:50"},{"section": 7,"startTime": "16:10","endTime": "17:00"},
                  {"section": 8,"startTime": "17:10","endTime": "18:00"},{"section": 9,"startTime": "19:00","endTime": "19:50"},
                  {"section": 10,"startTime": "20:00","endTime": "20:50"}]

  }
  
    // 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的
  	await loadTool('AIScheduleTools')
    let totalWeek = await AISchedulePrompt({
      titleText: '一学期有几周',
      tipText: '1-30周，再多了学校真变态',
      defaultText: 19,
      validator: value => {
        if (value < 1 || value > 30) return '咦，闹着玩呢！来给我学。'
        return false
      }
    })

    let forenoon = await AIScheduleSelect({
      titleText: '上午', 
      contentText: '上午有几节课', 
      selectList: [
        4,
        3,
        2,
        5,
        6,
      ], 
    })
    let afternoon = await AIScheduleSelect({
      titleText: '下午', 
      contentText: '下午有几节课', 
      selectList: [
        4,
        3,
        2,
        5,
        6,

      ], 
    })
    let night = await AIScheduleSelect({
      titleText: '晚上', 
      contentText: '晚上有几节课', 
      selectList: [
        2,
        3,
        4,
      ], 
    })
    await AIScheduleAlert('默认一天分了10节课，可根据需要修改')
    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    return {
      totalWeek: totalWeek, 
      startSemester: '',
      startWithSunday: false,
      showWeekend: true,
      forenoon: forenoon,
      afternoon: afternoon,
      night: night,
      sections: sectionTimes,
    }
    // PS: 夏令时什么的还是让用户在夏令时的时候重新导入一遍吧，在这个函数里边适配吧！奥里给！————不愿意透露姓名的嘤某人
  }
