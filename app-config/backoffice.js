//
// demo http://iot.sumana.biz:9080/
//
A.app({
  appName: "Back Office",
  forceLocale : "en",
  onlyAuthenticated: true,
  allowSignUp: true,
  appIcon: "rocket",
  menuItems: [{
    name: "ตารางสอน",
    entityTypeId: "Topics",
    icon: "table"
  },{
    name: "ตารางเวร",
    entityTypeId: "Event",
    icon: "table"
  },{
    name: "ทีมงาน",
    entityTypeId: "People",
    icon: "table"
  },{
    name: "สาขา",
    entityTypeId: "Branch",
    icon: "table"
  },{
    name: "Admins",
    icon: "list",
    children: [{
      name: "รุ่นครูสมาธิ",
      entityTypeId: "MiC",
      icon: "table",
    },{
      name: "รุ่นอาจาริยสา",
      entityTypeId: "AjarnC",
      icon: "table",
    },{
      name: "สถานะการยืนยัน",
      entityTypeId: "Status",
      icon: "sort"
    },      
    ],
  }],
  entities: function(Fields) {
    return {
      Branch: {
        title: "สถาบันพลังจิตตานุภาพ",
        fields: {
          name: Fields.text("สาขาชื่อ").required(),
          province: Fields.text("จังหวัด"),
          course: Fields.text("หลักสูตรที่เปิดสอน/ภาค"),
          manager: Fields.text("ผู้ดูแลสาขา"),
          phone: Fields.text("ติดต่อ"),
          email: Fields.email("email"),
          website: Fields.link("เวปไซด์"),
          lat: Fields.text("Latitude"),
          lng: Fields.text("Longitude"),          
          map: Fields.link("แผนที่ google"),
          note: Fields.text("Note."),          
          order : Fields.integer("Order"),
        },
        sorting: [['order', 1]],
        referenceName: "name",
        showInGrid: ['name','province','course','manager','phone','note'],
      },
      MiC: {
        fields: {
          name: Fields.text("รุ่นครูสมาธิ").required(),
          note: Fields.text("Note."),          
          order : Fields.integer("Order"),
        },
        sorting: [['order', 1]],
        referenceName: "name",        
      },
      AjarnC: {
        fields: {
          name: Fields.text("รุ่นอาจาริยสา").required(),
          note: Fields.text("Note."),          
          order : Fields.integer("Order"),
        },
        sorting: [['order', 1]],
        referenceName: "name",        
      },
      Status: {
        fields: {
          name: Fields.text("ชื่อสถานะ").required(),
          note: Fields.text("Note."),          
          order : Fields.integer("Order"),
        },
        sorting: [['order', 1]],
        referenceName: "name",        
      },
      Topics: {
        title: "ตารางสอน",
        fields: {
          name: Fields.text("ชื่อหัวข้อ").required(),
          length: Fields.text("เทปยาว"),
          note: Fields.text("Note."),
          order : Fields.integer("Order"),
          cft: Fields.relation("อาจารย์ผู้สอนยืนยัน", "ConfirmForTopics", "tt"),
          aft: Fields.relation("อาจารย์ที่เคยสอน", "AjarnForTopics", "tt"),
          wft: Fields.relation("อาจารย์ที่อยากสอนหัวข้อนี้ในรุ่น40", "WisherForTopics", "tt"),
        },
        sorting: [['order', 1]],
        referenceName: "name",        
        showInGrid: ['name','length','note'],
      },
      People : {
        title: "ทีมงาน",
        fields: {
          name: Fields.text("ชื่อทีมงาน").required(),
          mobile: Fields.text("มือถือ"),
          line: Fields.text("Line ID"),
          mic: Fields.fixedReference("รุ่นครูสมาธิ", "MiC"),
          isTeam: Fields.checkbox("ยังเป็นทีมงาน"),
          ajarnc: Fields.fixedReference("รุ่นอาจาริยสา", "AjarnC"),
          isAjarn: Fields.checkbox("ยังสอนครูสมาธิ"),
          branch: Fields.fixedReference("สาขาสังกัด","Branch"),
          note: Fields.text("Note."),
          order : Fields.integer("Order"),
          efp: Fields.relation("กิจกรรมที่ได้รับมอบหมาย", "EventForPeople", "pp"),
          tfc: Fields.relation("หัวข้อที่ยืนยัน", "TopicsForConfirm", "cc"),
          tfa: Fields.relation("หัวข้อที่เคยสอน", "TopicsForAjarn", "aa"),
          tfw: Fields.relation("หัวข้อที่อยากสอนในรุ่น40", "TopicsForWisher", "ww"),
        },
        sorting: [['order', 1]],
        referenceName: "name",        
        showInGrid: ['name','mobile','line','isTeam','isAjarn','note'],
        views: {
          isTeamView: {
            //title: "isTeamView",
            filtering: { isTeam : true } ,
          },
          isAjarnView: {
            //title: "isAjarnView",
            filtering: { isAjarn : true } ,
          },
          PeopleTeam: {
            //title: "PeopleTeam",
            filtering: { isTeam : true } ,
            showInGrid: ['name','mobile','line','isTeam','note'],
          },
          PeopleAjarn: {
            //title: "PeopleAjarn",
            filtering: { isAjarn : true } ,
            showInGrid: ['name','mobile','line','isTeam','isAjarn','note'],
          },
        }        
      },
      TopicsToConfirm : {
        fields: {
          date_: Fields.text("วันที่"),
          time_: Fields.text("เวลา"),
          tt: Fields.fixedReference("ชื่อหัวข้อที่ยืนยัน", "Topics"),
          cc: Fields.fixedReference("ชื่ออาจารย์ที่ยืนยัน", "isAjarnView", "People"),
          status: Fields.fixedReference("สถานะการยืนยัน", "Status"),
          isLunch: Fields.checkbox("จัดมื้อเที่ยง"),          
          isKnow: Fields.checkbox("เคยมาสาขา"),          
          isMap: Fields.checkbox("ขอแผนที่"),          
          note: Fields.text("Note."),
          branch: Fields.fixedReference("สาขาที่ยืนยันสอน", "Branch"),
        },
        views: {
          TopicsForConfirm: {
            //title: "TopicsForConfirm",
            showInGrid: ['date_','time_','tt','status','isLunch','isMap','note','branch'],
          },
          ConfirmForTopics: {
            //title: "ConfirmForTopics",
            showInGrid: ['date_','time_','cc','status','isLunch','isKnow','isMap','note','branch'],
          }
        }
      },
      TopicsToAjarn : {
        fields: {
          tt: Fields.fixedReference("ชื่อหัวข้อที่เคยสอน", "Topics"),
          aa: Fields.fixedReference("ชื่ออาจารย์ที่เคยสอน", "isAjarnView", "People"),
          branch: Fields.fixedReference("สาขาที่เคยสอน", "Branch"),
          note: Fields.text("Note."),
        },
        views: {
          TopicsForAjarn: {
            //title: "TopicsForAjarn",
            showInGrid: ['tt','branch','note'],
          },
          AjarnForTopics: {
            //title: "AjarnForTopics",
            showInGrid: ['aa'],
          }
        }
      },
      TopicsToWisher : {
        fields: {
          tt: Fields.fixedReference("ชื่อหัวข้อที่อยากสอนในรุ่น40", "Topics"),
          ww: Fields.fixedReference("ชื่ออาจารย์ที่อยากสอนในรุ่น40", "isAjarnView", "People"),
          note: Fields.text("Note."),
        },
        views: {
          TopicsForWisher: {
            //title: "TopicsForWisher",
            showInGrid: ['tt','note'],
          },
          WisherForTopics: {
            //title: "WisherForTopics",
            showInGrid: ['ww'],
          }
        }
      },
      Event: {
        title: "ตารางเวร",
        fields: {
          name: Fields.text("ชื่อกิจกรรม").required(),
          date: Fields.date("Date"),
          time: Fields.text("Starts at").masked("99:99"),
          isEnable : Fields.checkbox("ยกเลิก"),
          isFinished : Fields.checkbox("เสร็จสิ้น"),
          isVisible : Fields.checkbox("ซ่อน"),
          note: Fields.text("Note."),
          order : Fields.integer("Order"),
          pfe: Fields.relation("มอบหมายผู้เข้าร่วม", "PeopleForEvent", "ee"),
        },
        sorting: [['date', -1], ['time', -1]],
        referenceName: "name",
        showInGrid: ['name','date','time','isEnable','isFinished','note'],
      },
      EventToPeople: {
        fields: {
          ee: Fields.fixedReference("ชื่อกิจกรรมที่ได้รับมอบหมาย", "Event"),
          pp: Fields.fixedReference("ทีมงานที่จะเข้าร่วม", "isTeamView", "People"),
          //date: Fields.date("Date"),
          //time: Fields.text("Starts at").masked("99:99"),
          note: Fields.text("Note."),          
        },
        //filtering: function (User) { return {"user.id": User.id} },
        //sorting: [['date', -1], ['time', -1]],
        views: {
          EventForPeople: {
            //title: "EventForPeople",
            showInGrid: ['ee','note'],
          },
          PeopleForEvent: {
            //title: "PeopleForEvent",
            showInGrid: ['pp'],
          }
        }
      },
      User: {
        views: {
          OnlyNameUser: {
            permissions: {
              read: null,
              write: ['admin']
            }
          },
          fields: {
            username: Fields.text("User name")
          }
        }
      }
    }
  }
});