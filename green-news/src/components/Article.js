import React from 'react';
import moment from 'moment';
import  TwitterIcon from '@material-ui/icons/Twitter';
import  FacebookIcon from '@material-ui/icons/Facebook';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import './Article.css'

export default class Article extends React.Component {

    render() {

        const {
            title, 
            description,
            publishedAt,
            source,
            urlToImage,
            url
        } = this.props.article;
        const time = moment(publishedAt || moment.now()).fromNow();
        const defaultImg = 'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';


        return(
        
            <a href={url} target="_blank" className="card">
                <img src={urlToImage || defaultImg} className="image"/>
                <h3 className="title">{title}</h3>
                <h4 className="description">{description || "Read more..."}</h4>
                <div className="foot">
                    <h6 className="foot-text">{source.name.toUpperCase()}</h6>
                    <h6 className="foot-text">{time}</h6>
                    <TwitterShareButton url={url} title={title} hashtags={["earthnews"]}>
                        <TwitterIcon className="twitter" style={{ height: '40', width: '40' }}/>
                    </TwitterShareButton>
                    <FacebookShareButton url={url} title={title} hashtags={["earthnews"]}>
                        <FacebookIcon className="twitter" style={{ height: '40', width: '40' }}/>
                    </FacebookShareButton>
                </div>
            </a>
        )

    }

}