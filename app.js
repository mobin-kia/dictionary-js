let inputSearch = document.getElementById("Search-input")
let searchBtn = document.querySelector(".Search-btn")
let mainword = document.querySelector("h1")
let detailOfword = document.querySelector("h4")
let descriptionOfWord= document.querySelector(".Description")
let speakerIcon = document.querySelector("img")





let Url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;




const getData = (word)=>{
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(resp=> resp.json())
    .then(data => genrateData(data))
}



function genrateData (data) {


        let mainData  = data[0] ; 
        
        if(mainData){
            mainword.innerHTML = mainData.word ; 
            detailOfword.innerHTML = `${mainData.meanings[0].partOfSpeech} /  ${mainData.phonetic} ` ;
            descriptionOfWord.innerHTML = mainData.meanings[0].definitions[0].definition ; 

            let audioData = mainData.phonetics[0].audio

            if(audioData){

                speakerIcon.dataset.audio = audioData ; 

             
                
            }else{
              return 0;
            }

        }else{
            alert(" Word not found !")
        }
        console.log(mainData);
}










searchBtn.onclick = ()=>{
    let word = inputSearch.value;
    
    if(word){
         getData(word)
        console.log(word);
    }else{
        return 0 ;
    }
    
    inputSearch.value = ""
}



speakerIcon.onclick = function () {

    let audioSrc = this.dataset.audio;
 
    if(audioSrc){
     
     let audio = new Audio(audioSrc);
     audio.play()

    }else{
        alert("There is no audio :(")
    }
    
    this.dataset.audio = ""
}




document.addEventListener("keydown" , (key)=>{
    let word = inputSearch.value;
 if(key.keyCode == 13 && word){
    getData(word)
   
 }else{
    return 0 ;
 }

  inputSearch.value = ""
})