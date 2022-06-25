const moment = require('moment')
module.exports ={
    formateDate: (date,format)=>{
        return moment(date).utc().format(format)
    },
    truncate: (str,len)=>{
        if(str.length>len && str.length>0){
            let newStr = str + ' '
            newStr =str.substr(0,len)
            newStr = str.substr(0,newStr.lastIndexOf(' '))
            newStr = str.length>0 ? newStr: str.substr(0,len)
            return newStr+'.....'

        }
        return str
    },
    stripTags:(input)=>{
        return input.replace(/(<(?:.|\n)*?>)/gm,'')
    },
    editIcon:(storyUser,loggedUser,storyId,floating=true)=>{
        if(storyUser._id.toString() == loggedUser._id.toString()){
            if(floating){
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`

            }else{
                 return `<a href="/stories/edit/${storyId}" ><i class="fa fa-edit"></i></a>`;
            }
        }
        return ''
    }


}