import axios from 'axios';
import { useState, useEffect } from "react";
import './news.css';

type NewsProps = {
	image : string,
	title : string,
	category : string,
	timeSince : number,
	source : string,
	description : string,
	topNew : boolean,
	lastNew : boolean
}

function NewsElement(info : NewsProps) {
	return (
		<div className={`news_element ${info.topNew? "news_first" : info.lastNew ? "news_last" : ""}`}>
			<div className="news_image_container">
				<img className="news_image" src={info.image} alt="Text"/>
			</div>
			<div className="news_info">
				<span className="news_metadata">{info.category} {info.source} · hace {info.timeSince /*Add logic to calculate days*/} horas</span>
				<div className="newsEl_title">
					{info.title}
				</div>
				<div className="news_text">
					{info.description}
				</div>

			</div>
		</div>
	);
}


function News() {
	const [fetchedNews, setFetchedNews] = useState([])
	useEffect(() =>{

    function dataToNews(data : any){
      const fetchedNews :any = []
      for(let i = 0; i<8;i+=2){
        fetchedNews.push({
          image : data.news[i].imgsrc,
          title : data.news[i].title,
          category : "Finanzas",
          timeSince : 5,
          source : "Financial Times",
          description:data.news[i].text,
          topNew:false,
          lastNew:false
        })
      }
      fetchedNews[0].topNew = true
      fetchedNews[fetchedNews.length-1].lastNew = true
      return fetchedNews
    }
		axios.get(process.env.REACT_APP_API_URL + "/stock/AAPL").then((result:any) =>{
				  setFetchedNews(dataToNews(result.data))
	})
}, [])

return (
	<div className="news">
		<div className="news_title">
			Noticias destacadas
		</div>
		<div className="news_subtitle">
		<div className="news_subtitle_el news_current">
			Índices
		</div>
		<div className="news_subtitle_el">
		Cripto
		</div>
		<div className="news_subtitle_el">
		Divisas
		</div>
		<div className="news_subtitle_el">
		Bonos
		</div>
		<div className="news_subtitle_el">
		Materias primas
		</div>
		</div>
		<div className="group_42">
		<NewsElement {...fetchedNews[0]}/>
		<NewsElement {...fetchedNews[1]}/>
		<NewsElement {...fetchedNews[2]}/>
		<NewsElement {...fetchedNews[3]}/>
		</div>
		</div>
);
}

export default News;
