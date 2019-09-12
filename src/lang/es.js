export default {
  route: {
    dashboard: 'แผงควบคุมไฟฟ้า',
    documentation: 'เอกสาร',
    guide: 'คู่มือ',
    permission: 'ใบอนุญาต',
    pagePermission: 'สิทธิ์หน้า',
    rolePermission: 'สิทธิ์ในบทบาท',
    directivePermission: 'การอนุญาต',
    icons: 'ไอคอน',
    components: 'ส่วนประกอบ',
    tinymce: 'ทิงส์',
    markdown: 'ลดราคา',
    jsonEditor: 'บรรณาธิการ JSON',
    dndList: 'รายการ DND',
    splitPane: 'บานหน้าต่างแยก',
    avatarUpload: 'หัวอัพโหลด',
    dropzone: 'เขตหยด',
    sticky: 'เหนียว',
    countTo: 'การนับรวม',
    componentMixin: 'โปรตีนผสม',
    backToTop: 'กลับไปด้านบน',
    dragDialog: 'ลากกล่องโต้ตอบ',
    dragSelect: 'ลากเลือก',
    dragKanban: 'ลากแผง',
    charts: 'แผนภูมิ',
    keyboardChart: 'แผนภูมิแป้นพิมพ์',
    lineChart: 'แผนภูมิเส้นโค้ง',
    mixChart: 'แผนภูมิผสม',
    example: 'ตัวอย่าง',
    nested: 'เส้นทางซ้อนกัน',
    menu1: 'เมนู',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'เมนู',
    Table: 'ตารางข้อมูล',
    dynamicTable: 'ตารางแบบไดนามิก',
    dragTable: 'การลาก',
    inlineEditTable: 'แก้ไขโดยตรง',
    complexTable: 'ตารางที่ซับซ้อน',
    tab: 'ฉลาก',
    form: 'แบบฟอร์ม',
    createArticle: 'สร้างบทความ',
    editArticle: 'แก้ไขบทความ',
    articleList: 'รายการสินค้า',
    errorPages: 'หน้าข้อผิดพลาด',
    page401: '401',
    page404: '404',
    errorLog: 'บันทึกข้อผิดพลาด',
    excel: 'เชี่ยวชาญ',
    exportExcel: 'ส่งออก Excel',
    selectExcel: 'ส่งออกรายการที่เลือก',
    mergeHeader: 'ชื่อผู้ใช้',
    uploadExcel: 'อัพโหลด Excel',
    zip: 'ซิป',
    pdf: 'ไฟล์ PDF',
    exportZip: 'รหัสไปรษณีย์เพื่อการส่งออก',
    theme: 'หัวข้อ',
    clipboardDemo: 'คลิปบอร์ด',
    i18n: 'เอลฟ์',
    externalLink: 'การเชื่อมโยงภายนอก',
    profile: 'ย่อๆ',
    advertDetail: 'รายละเอียดโฆษณา',
    businessDetail: 'รายละเอียดธุรกิจ',
    agentDetail: 'รายละเอียดตัวแทน',
    agreementDetail: 'รายละเอียดข้อตกลง',
    guideDetail: 'รายละเอียดคู่มือ',
    editAdvert: 'ปล่อยโฆษณาบัญชีแยกประเภท'
  },
  navbar: {
    dashboard: 'Dashboard',
    github: 'Github',
    logOut: 'Log Out',
    profile: 'Profile',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login Form',
    logIn: 'Login',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'บทบาทใหม่',
    editPermission: 'ตัดต่อ',
    roles: 'บทบาทของคุณ',
    switchRoles: 'เปลี่ยนบทบาท',
    tips: 'ในบางกรณีการใช้ v -permission จะไม่มีผล ตัวอย่างเช่นองค์ประกอบที่เป็นแท็บหรือตารางคอลัมน์และแบบไดนามิกอื่นๆแสดงฉากดอม คุณสามารถใช้ v -if เท่านั้น',
    delete: 'ลบทิ้ง',
    confirm: 'ยืนยัน',
    cancel: 'ยกเลิก',
    login: 'บัญชีผู้ประกอบการ',
    status: 'สภาพ',
    search: 'ค้นหา',
    id: 'ID',
    name: 'นาม',
    phone: 'รายละเอียดการติดต่อ',
    createtime: 'สร้างเวลา',
    rolename: 'ชื่อบทบาท',
    adduser: 'เพิ่มผู้ประกอบการ',
    edituser: 'ตัดต่อ',
    password: 'ส่งข่าว',
    nickname: 'ชื่อเต็ม'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'ค้นหา',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  example: {
    warning: 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name (default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name (default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  },
  advert: {
    nickName: 'นาม',
    phone: 'รายละเอียดการติดต่อ',
    address: 'แว่นแคว้น',
    addressDetail: 'รายละเอียดที่อยู่',
    companyName: 'ชื่อบริษัท',
    licenseCode: 'หมายเลขใบอนุญาตธุรกิจ',
    licenseImg: 'รูปถ่ายที่ได้รับอนุญาต',
    companyImg: 'ภาพถ่ายบริษัท',
    statusName: 'สภาพ',
    createTime: 'เวลาสมัคร',
    checkTime: 'ตรวจสอบเวลา',
    detail: 'รายละเอียด',
    advertTime: 'เวลาปล่อย',
    title: 'ชื่อหนังสือ',
    content: 'เนื้อหา',
    sort: 'อันดับ',
    eventName: 'ประเภทของการกระโดด',
    addAdvert: 'ประกาศโฆษณา',
    frameImg: 'รูปภาพของหน้าต่างสัญลักษณ์บนหน้าแรก',
    img: 'รูปภาพโฆษณา',
    url: 'การเชื่อมโยงภายนอก',
    CNTitle: 'ชื่อภาษาจีน',
    ENTitle: 'ชื่อภาษาอังกฤษ',
    THAITitle: 'ชื่อภาษาไทย',
    CNContent: 'เนื้อหาภาษาจีน',
    ENContent: 'เนื้อหาภาษาอังกฤษ',
    THAIContent: 'เนื้อหาภาษาไทย',
    setFrame: 'หน้าต่างสัญลักษณ์บนหน้าแรก'
  },
  agent: {
    pass: 'ตั้งค่ารหัสผ่าน'
  },
  business: {
    cardType: 'ประเภทไฟล์',
    cardNo: 'หมายเลขประจำตัว',
    baseMsg: 'ข้อมูลพื้นฐาน',
    businessMsg: 'ข้อมูล',
    cardFront: 'หน้า',
    cardBack: 'หลัง',
    passPort: 'ผ่านพอร์ต',
    editDetail: 'แก้ไขข้อมูลทางธุรกิจ',
    headUrl: 'พระพักตร์',
    coverUrl: 'ป้ายร้าน',
    editLoginPass: 'รีเซ็ตรหัสผ่านเข้าสู่ระบบ',
    editPayPass: 'ตั้งค่ารหัสผ่านการชำระเงิน',
    sureReset: 'คุณแน่ใจหรือว่าตั้งค่าใหม่ รหัสผ่านเริ่มต้นสำหรับ'
  },
  customer: {
    phone: 'รายละเอียดการติดต่อ',
    email: 'จดหมายอิเล็กทรอนิกส์',
    nickName: 'ชื่อเล่น',
    areaCode: 'รหัสพื้นที่',
    isReal: 'ชื่อจริง',
    statusName: 'สภาพ',
    createTime: 'เวลาลงทะเบียน',
    money: 'เงิน',
    hour: 'ชั่วโมง',
    deposit: 'หุ้นทุน',
    freeze: 'ทำให้ชะงัก',
    unfreeze: 'ละลาย',
    resetPass: 'ตั้งค่ารหัสผ่านธุรกรรม',
    restPay: 'รีเซ็ตรหัสผ่านเข้าสู่ระบบ',
    handleStatusTip: 'ยืนยันสถานะผู้ใช้ปัจจุบันของการดำเนินงาน?',
    payWord: 'รหัสผ่าน',
    passWord: 'รหัสผ่านเข้าสู่ระบบ'
  },
  agreement: {
    title: 'ชื่อหนังสือ',
    createTime: 'สร้างเวลา'
  },
  cash: {
    customerCash: 'เงินสดของผู้ใช้',
    businessCash: 'ธุรกิจเงินสด',
    num: 'จำนวนเงินสด',
    scale: 'ค่าบริการเงินสด',
    minVal: 'ถอนขั้นต่ำ',
    maxVal: 'เงินสดสูงสุด',
    multiple: 'การถอนเงินเต็มครั้ง',
    isOpen: 'ว่าจะเปิดหรือไม่',
    type: 'จำกัดเงินสด',
    tax: 'อัตราภาษี',
    payCode: 'หมายเลขธุรกรรม',
    cashName: 'พิธีกร',
    phone: 'โทรศัพท์',
    bankName: 'ชื่อธนาคาร',
    bankCode: 'รหัสธนาคาร',
    cashMoney: 'เงินสด',
    realMoney: 'ชินจอน',
    cashType: 'ประเภทเงินสด',
    statusName: 'สภาพ',
    rejectRemark: 'ปฏิเสธที่จะแสดงความคิดเห็น',
    createTime: 'เวลาสมัคร',
    customer: 'ประเทศอเมริกา',
    business: 'พณิชย์',
    addBankType: 'ประเภทบัตรใหม่'
  },
  gift: {
    money: 'เงิน',
    hour: 'ชั่วโมง',
    discount: 'ส่วนลด'
  },
  device: {
    code: 'หมายเลขอุปกรณ์',
    typeName: 'ประเภทอุปกรณ์',
    businessName: 'ธุรกิจ',
    businessHours: 'ชั่วโมงธุรกิจ',
    addressDetail: 'รายละเอียดที่อยู่',
    statusName: 'สถานะของอุปกรณ์',
    large: 'ตู้',
    small: 'ตู้เอทีเอ็ม',
    timeSlot: 'ช่วงเวลา',
    addDevice: 'เพิ่มอุปกรณ์'
  },
  date: {
    sunday: 'อาทิตย์',
    monday: 'วันจันทร์',
    tuesday: 'วันอังคาร',
    wednesday: 'วันพุธ',
    thursday: 'วันพฤหัสบดี',
    friday: 'วันศุกร์',
    saturday: 'เสาร์'
  },
  payment: {
    alipay: 'จ่ายสมบัติ',
    partner: 'บัญชีธุรกิจ',
    partnerAccount: 'บัญชีอาลี',
    privateKey: 'คีย์ส่วนตัว',
    aliPublicKey: 'การชำระเงินกุญแจสาธารณะ',
    aliPrivateKey: 'คีย์ส่วนตัว',
    returnUrl: 'ชื่อโดเมนโทรกลับ',
    refundPublicKey: 'คืนกุญแจสาธารณะ',
    refundPrivateKey: 'คืนคีย์ส่วนตัว'
  },
  status: {
    pass: 'ผ่าน',
    reject: 'ปฏิเสธ',
    apply: 'ประยุกต์',
    success: 'ประสบความสำเร็จ',
    fail: 'เสียเหลี่ยม',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    yes: 'ใช่แล้ว',
    no: 'ไม่',
    handle: 'การดำเนินการ',
    effective: 'ประสิทธิผล',
    invalid: 'โมฆะ',
    edit: 'ตัดต่อ',
    save: 'เก็บรักษา',
    delete: 'ลบทิ้ง',
    deleteMsg: 'ตรวจสอบการลบข้อมูลปัจจุบัน？'
  }
}
