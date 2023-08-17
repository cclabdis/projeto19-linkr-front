const hashtagRegex = /#(\w+)/g; //regex para retirar apenas as hashtags


export default function IdentifyHashtags(text){
    const hashtags = text.match(hashtagRegex); //váriavel que recebe a comparação do texto com a regex que foi criada
    const hashtagsUnique = hashtags.filter((el,i)=>{return (hashtags.indexOf(el)===i) }); //FUnção para eliminar valores repetidos na nossa lista inicial
    return hashtagsUnique;
}