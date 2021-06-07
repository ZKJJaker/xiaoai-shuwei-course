//存储
var result= [];
var courseInfos = [];
function scheduleHtmlParser(html) {
  //除函数名外都可编辑
  //传入的参数为上一步函数获取到的html
  //可使用正则匹配
  //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了
  //作者：Jaker
  //更新时间：2021年6月7日20:32:28
  //联系方式(QQ)：2205909051
  //可能会添加的功能 学生课表和班级课表都能导入，但是课表天天变动有可能不加


//因为课时时间是固定的所以直接写死了
// 可以根据当前时间判断是春秋那个季节的时间表
// 秋季  目前也只知道秋季。。。。
var nowMonth = new Date().getMonth();
// 八月之前算春季学期 不可能到八月还上学吧
let sectionTimes;
if(nowMonth<=8||nowMonth>=2){
  sectionTimes = `,"sectionTimes": [{"section": 1,"startTime": "08:00","endTime": "08:50"},
                {"section": 2,"startTime": "09:00","endTime": "09:50"},{"section": 3,"startTime": "10:10","endTime": "11:00"},
                {"section": 4,"startTime": "11:10","endTime": "12:00"},{"section": 5,"startTime": "14:00","endTime": "14:50"},
                {"section": 6,"startTime": "15:00","endTime": "15:50"},{"section": 7,"startTime": "16:10","endTime": "17:00"},
                {"section": 8,"startTime": "17:10","endTime": "18:00"},{"section": 9,"startTime": "19:00","endTime": "19:50"},
                {"section": 10,"startTime": "20:00","endTime": "20:50"}]}`
}else{
//   八月之后是秋季学期 好像有时候要到1月
  sectionTimes = `,"sectionTimes": [{"section": 1,"startTime": "08:00","endTime": "08:50"},
                {"section": 2,"startTime": "09:00","endTime": "09:50"},{"section": 3,"startTime": "10:10","endTime": "11:00"},
                {"section": 4,"startTime": "11:10","endTime": "12:00"},{"section": 5,"startTime": "14:00","endTime": "14:50"},
                {"section": 6,"startTime": "15:00","endTime": "15:50"},{"section": 7,"startTime": "16:10","endTime": "17:00"},
                {"section": 8,"startTime": "17:10","endTime": "18:00"},{"section": 9,"startTime": "19:00","endTime": "19:50"},
                {"section": 10,"startTime": "20:00","endTime": "20:50"}]}`

}

// 获取必要信息
let Allinfo = $('.infoTitle');
//课程表需要的信息
let day = '';
let sections = [];
let csinfo = '';

for (i=0;i<Allinfo.length;i++){
  csinfo = Allinfo[i].attribs.title;
//   反为长度为四的数组。最好一个数据总是week和position
  csinfo = csinfo.split(";");

//   第二个数据是空字符串的话说明有两次不同地点、不同老师、不同周、不同课程
//   第几天不变，几节课不变
//   星期几的课
  day = Allinfo[i].attribs.id;
  day = day.length > 5 ? parseInt(day[2])+1 : 1;

//     这节课在第几节
  let section = Allinfo[i].attribs.id;
  section = parseInt(section[section.length-3])+1;
  let rowspan = Allinfo[i].attribs.rowspan;
  if(rowspan === undefined){
    sections = [{"section":section}];
  }else if(rowspan==2){
    sections = [{"section":section},{"section":section+1}];
  }
  
  result = {day:day,sections:sections};
//     获取地点、老师、周次、课程
  if(csinfo[1] === "" || csinfo.length <= 2){
    getOneCourseInfo(csinfo,0,csinfo.length-1);
  }else if(csinfo.length>2){
    getOneCourseInfo(csinfo,0,1);
    result = {day:day,sections:sections};
    getOneCourseInfo(csinfo,2,3);
  }
}
  result = JSON.stringify(courseInfos);

  result = '{"courseInfos":'+result+sectionTimes;
//   最后要返回前的结果
  console.info(result);
  result = JSON.parse(result);
  return result;
}
/*
*   处理地点、老师、周次、课程
*/  
function getOneCourseInfo(info,num1,num2) {
  let name = '';
  let position = '';
  let teacher = '';
  let week = '';

  name = info[num1].match(/^.+?[(]/).toString().replace(/\(/g,"");

  teacher = info[num1].split(" ")[1].replace(/[()]/g,"");
//   console.info(teacher);
  position = info[num2].match(/,.*?[(]{1}/);
//   为了匹配有线上课程 没有教室的情况 
  position = position == null ? "线上课程" : position[0].replace(/[,(]/g,"");
//   console.info(position);

  week = info[num2].split(',')[0];
  week = week.replace(/[()]/g,"");
//   console.info(week);
  result['name'] = name;
  result['position'] = position;
  result['teacher'] = teacher;
  result['weeks'] = getweeks(week);
//   result = {name:name,position:position,teacher:teacher,weeks:getweeks(week)};
  courseInfos.push(result);
  console.info(result);
  result = {};
}

//得到课时周次信息
function getweeks(week) {
// 最复杂的情况 比如 单1-8 双9-16 或者 双1-9 ,10,13,16 或 1,4,5 单6-16
  let weeks = [];
  let flag = 1;
// 第一 有共同特点中间有空格
  week = week.split(" ");
  for(k=0;k<week.length;k++){
    let ww = week[k];
//       无论是单周还是双周都是从（1-9  2-10）第一个开始的只要步长为2就可以隔周
      if(ww[0]=="单" || ww[0]=="双"){
          ww = ww.substring(1);
          ww = ww.split("-");
          ww[0] = parseInt(ww[0]);
          for(ww[0];ww[0]<=ww[1];ww[0]+=2){
            weeks.push(ww[0]);
          }
      }
      else if(/,/.test(ww)){
        ww = ww.split(",")
        for(i=0;i<ww.length;i++){
          ww[i] = parseInt(ww[i]);
          weeks.push(ww[i]);
        }
      }
//       只有一个周的情况
      else if(ww.length<3){
        weeks.push(parseInt(ww));
      }else{
        ww = ww.split("-");
        ww[0] = parseInt(ww[0]);
        for(ww[0];ww[0]<=ww[1];ww[0]++){
          weeks.push(ww[0]);
        }
      } 
  }
//   console.info(weeks);
  return weeks;
}

