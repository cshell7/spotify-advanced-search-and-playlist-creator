(this["webpackJsonpspotify-advanced-search-and-playlist-creator"]=this["webpackJsonpspotify-advanced-search-and-playlist-creator"]||[]).push([[0],{31:function(e,n,t){e.exports=t(42)},42:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t(0),i=t.n(r),o=t(26),c=t.n(o),l=t(21),u=t(10),s=t(2),d=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function p(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var f={acousticness:{label:"Acousticness",description:"A confidence measure whether the track is acoustic."},danceability:{label:"Danceability",description:"Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity."},energy:{label:"Energy",description:"Energy is a measure that represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."},instrumental:{label:"Instrumental",description:"Predicts whether a track contains no vocals. \u201cOoh\u201d and \u201caah\u201d sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly \u201cvocal\u201d."},key:{label:"Key",description:"The key the track is in."},liveness:{label:"Liveness",description:"Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live."},loudness:{label:"Loudness",description:"The overall loudness of a track in decibels dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db."},mode:{label:"Mode",description:"Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived."},popularity:{label:"Popularity",description:"The popularity of the track. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time."},speechiness:{label:"Speechiness",description:"Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry)."},tempo:{label:"Tempo",description:"The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."},time_signature:{label:"Meter",description:"An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure)."},valence:{label:"Valence",description:"A measure describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."}},m="#1DB954",b="#191414",h="#FFFFFF",v="#707070",g={0:"C",1:"C\u266f/D\u266d",2:"D",3:"D\u266f/E\u266d",4:"E",5:"F",6:"F\u266f/G\u266d",7:"G",8:"G\u266f/A\u266d",9:"A",10:"A\u266f/B\u266d",11:"B"};function y(){var e=Object(a.a)(["\n  body {\n    color: ",";\n    background-color: ",";\n    font-family: Helvetica,Arial,sans-serif;\n    font-size: 16px;\n    line-height: 1.5;\n    margin: 0;\n    font-weight: 100;\n  }\n  *  {\n    box-sizing: border-box;\n  }\n  html, body, #root {\n    overflow: hidden;\n    width: 100vw;\n    height: 100vh;\n  }\n"]);return y=function(){return e},e}var x=Object(s.a)(y(),h,b);function O(){var e=Object(a.a)(["\n  color: ",";\n  text-align: center;\n  font-weight: 100;\n"]);return O=function(){return e},e}function E(){var e=Object(a.a)(["\n  margin: 0;\n  text-align: center;\n  font-weight: 100;\n  border-bottom: 4px solid ",";\n"]);return E=function(){return e},e}function j(){var e=Object(a.a)(["\n  margin: auto;\n  padding: 24px;\n  border: 1px solid ",";\n  border-radius: 4px;\n  width: 480px;\n  background-color: ",";\n"]);return j=function(){return e},e}var w=s.b.div(j(),h,b),k=s.b.h3(E(),v),S=s.b.p(O(),h);w.Header=k,w.Copy=S;function C(){var e=Object(a.a)(["\n  color: ",";\n  text-decoration: none;\n"]);return C=function(){return e},e}var P=s.b.a(C(),m),z=function(){var e=Object(u.b)().error;return i.a.createElement(w,null,i.a.createElement(w.Header,null,"Something Bad Happened!"),i.a.createElement(w.Copy,null,e.message),i.a.createElement(w.Copy,null,i.a.createElement(P,{href:e.link},e.code)))};function A(){var e=Object(a.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  padding: 8px;\n  border: none;\n  border-radius: 2px;\n  background-color: ",";\n  color: ",";\n  font-size: 14px;\n  line-height: 1;\n  text-align: center;\n  white-space: 'nowrap';\n  cursor: pointer;\n  outline: none;\n  font-weight: 600;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n  &:hover:not([disabled]) {\n    opacity: 0.8;\n  }\n\n  &:active {\n    opacity: 0.9;\n  }\n\n  &:focus {\n    border: 1px solid ",";\n  }\n\n  &[disabled] {\n    background-color: ",";\n  }\n"]);return A=function(){return e},e}var T=s.b.button(A(),m,h,b,v);function M(){var e=Object(a.a)([""]);return M=function(){return e},e}var _=Object(s.b)((function(e){var n=e.className,t=Object(u.b)(),a=t.getUserAccessToken,r=t.isAuthed;return i.a.createElement(T,{onClick:function(){return a({redirectUri:"http://lvh.me:3000/",scope:"user-read-recently-played playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private"})},className:n},r?"Reauth":"Auth")}))(M());function F(){var e=Object(a.a)(["\n  "," {\n    margin: 0 auto;\n  }\n"]);return F=function(){return e},e}var L=Object(s.b)(w)(F(),_),I=function(){return i.a.createElement(L,null,i.a.createElement(w.Header,null,"Please link your Spotify account to continue"),i.a.createElement(w.Copy,null,"This authorization is temporary and allows spotify to search for songs for your and save them to a playlist. You will be taken to Spotify's site to login then redirected back here. I don't store any of your data."),i.a.createElement(_,null))},N=t(18),R=t(17),B=t(3),D=t(4),H=(t(12),t(30));function V(){var e=Object(a.a)(["\n  height: 32px;\n  width: 32px;\n  cursor: pointer;\n"]);return V=function(){return e},e}function W(){var e=Object(a.a)(["\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: ",";\n  opacity: ",";\n  pointer-events: ",";\n  transition: opacity 0.2s;\n  cursor: pointer;\n"]);return W=function(){return e},e}function U(){var e=Object(a.a)(["\n  height: 4px;\n  width: 100%;\n  margin: 16px 0;\n  background-color: ",";\n"]);return U=function(){return e},e}function J(){var e=Object(a.a)(["\n  font-size: 12px;\n  margin: 0;\n"]);return J=function(){return e},e}function G(){var e=Object(a.a)(["\n  font-size: 14px;\n  margin: 0;\n  font-weight: 600;\n"]);return G=function(){return e},e}function K(){var e=Object(a.a)(["\n  text-align: center;\n  font-size: 24px;\n  font-weight: 400;\n  margin: 0;\n"]);return K=function(){return e},e}function X(){var e=Object(a.a)(["\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  font-weight: 900;\n  font-size: 20px;\n  cursor: pointer;\n"]);return X=function(){return e},e}function q(){var e=Object(a.a)(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 300px;\n  height: 100%;\n  padding: 32px 16px;\n  color: ",";\n  background: ",";\n  border-left: 4px solid ",";\n  z-index: 1;\n  pointer-events: ",";\n  transform: translateX(",");\n  transition: transform 0.2s;\n  overflow: auto;\n\n  "," {\n    margin: 8px auto;\n  }\n"]);return q=function(){return e},e}var Y=s.b.div(q(),b,h,v,(function(e){return e.isOpen?"all":"none"}),(function(e){return e.isOpen?"0":"100%"}),_),$=s.b.div(X()),Q=s.b.h4(K()),Z=s.b.h2(G()),ee=s.b.p(J()),ne=s.b.div(U(),m),te=s.b.div(W(),b,(function(e){return e.isOpen?.7:0}),(function(e){return e.isOpen?"all":"none"})),ae=function(e){var n=e.isOpen,t=e.close,a=void 0===t?function(){}:t;return i.a.createElement(i.a.Fragment,null,i.a.createElement(Y,{isOpen:n},i.a.createElement($,{onClick:a},"X"),i.a.createElement(Q,null,"Info"),i.a.createElement(_,null),i.a.createElement(Z,null,"How to use:"),i.a.createElement(ee,null,"TODO add this"),i.a.createElement(ne,null),Object.values(f).map((function(e){var n=e.label,t=e.description;return i.a.createElement(i.a.Fragment,null,i.a.createElement(Z,null,n),i.a.createElement(ee,null,t))}))),i.a.createElement(te,{isOpen:n,onClick:a}))},re=s.b.img.attrs((function(){return{src:"/info-icon.png"}}))(V());function ie(){var e=Object(a.a)(["\n  position: absolute;\n  right: 0;\n  height: 100%;\n  border-top: 1px solid ",";\n  border-right: 1px solid ",";\n  border-bottom: 1px solid ",";\n  box-sizing: border-box;\n  opacity: 0.4;\n"]);return ie=function(){return e},e}function oe(){var e=Object(a.a)(["\n  position: relative;\n  width: ","%;\n  min-width: 4px;\n  height: 12px;\n\n  &::before,\n  &::after {\n    content: '';\n    position: absolute;\n    height: 100%;\n    width: 100%;\n  }\n  &::before {\n    background-color: ",";\n  }\n  &::after {\n    background-color: ",";\n    opacity: ",";\n  }\n"]);return oe=function(){return e},e}function ce(){var e=Object(a.a)(["\n  position: relative;\n  width: 100%;\n  max-width: 64px;\n  display: flex;\n  align-content: center;\n"]);return ce=function(){return e},e}var le=s.b.div(ce()),ue=s.b.div(oe(),(function(e){return e.percentage}),(function(e){return e.lowValueColor}),(function(e){return e.highValueColor}),(function(e){var n=e.percentage;return(n-(110-n)*e.fadeRate)/100})),se=s.b.div.attrs((function(e){var n=e.percentage;return{style:{width:"".concat(100-n,"%")}}}))(ie(),v,v,v),de=function(e){var n=e.percentage,t=e.lowValueColor,a=void 0===t?v:t,r=e.highValueColor,o=void 0===r?m:r,c=e.fadeRate,l=void 0===c?.1:c;return i.a.createElement(le,null,i.a.createElement(ue,{percentage:n,lowValueColor:a,highValueColor:o,fadeRate:l}),i.a.createElement(se,{percentage:n}))};function pe(){var e=Object(a.a)(["\n  color: ",";\n  text-decoration: none;\n"]);return pe=function(){return e},e}function fe(){var e=Object(a.a)(["\n  display: flex;\n  align-content: center;\n  align-items: center;\n  ","\n  font-size: ",";\n  a, p {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis\n  }\n"]);return fe=function(){return e},e}function me(){var e=Object(a.a)(["\n  height: 16px;\n  width: 16px;\n"]);return me=function(){return e},e}function be(){var e=Object(a.a)(["\n  height: 24px;\n  width: 24px;\n"]);return be=function(){return e},e}function he(){var e=Object(a.a)(["\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n  transition: transform 1s;\n  transform: rotate(0);\n  ","\n\n  &[disabled] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n"]);return he=function(){return e},e}function ve(){var e=Object(a.a)(["\n  from {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n"]);return ve=function(){return e},e}function ge(){var e=Object(a.a)(["\n  height: 24px;\n  width: 24px;\n  cursor: pointer;\n"]);return ge=function(){return e},e}var ye=s.b.img.attrs((function(){return{alt:"Play/Pause preview"}}))(ge()),xe=(Object(s.c)(ve()),s.b.img.attrs((function(){return{alt:"Add to playlist",src:"/add-icon.png"}}))(he(),(function(e){return e.isLoading&&"transform: rotate(180deg);"}))),Oe=s.b.img.attrs((function(){return{alt:"Added to playlist",src:"/check-icon.png"}}))(be()),Ee=s.b.img.attrs((function(){return{alt:"Explicit",src:"/explicit-icon.png",label:"Explicit"}}))(me()),je=s.b.div(fe(),(function(e){return e.isOdd&&"background-color: #ffffff0f;"}),(function(e){var n=e.size;return n?"".concat(n,"px"):"inherit"})),we=s.b.a(pe(),m),ke=function(e){var n=e.song,t=e.handlePlayPauseSong,a=e.isPlaying,r=e.handleSaveSongToPlaylist,o=e.activePlaylistId,c=e.index,l=e.isSavingToPlaylist,u=e.isSaved,s=n.name,d=n.id,p=n.artists,f=n.explicit,m=n.duration_ms,b=n.popularity,h=n.audioFeatures,v=n.preview_url,y=n.uri,x=h.acousticness,O=h.danceability,E=h.energy,j=h.instrumentalness,w=h.key,k=h.liveness,S=h.loudness,C=h.mode,P=h.speechiness,z=h.tempo,A=h.time_signature,T=h.valence,M=function(e){return e%2===1},_=function(e){var n,t,a;return n=Math.round(e/1e3),t=Math.floor(n/60),n%=60,a=Math.floor(t/60),{seconds:n,minutes:t%=60,hours:a}}(m);return l&&console.log({isSavingToPlaylist:l}),i.a.createElement(i.a.Fragment,null,i.a.createElement(je,{isOdd:M(c),onClick:function(){return t(n)}},v?i.a.createElement(ye,{src:a?"/pause-icon.png":"/play-icon.png"}):""),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(we,{href:y},s)),i.a.createElement(je,{isOdd:M(c)},f&&i.a.createElement(Ee,null)),i.a.createElement(je,{isOdd:M(c),size:14},p.map((function(e){return e.name})).join(", ")),i.a.createElement(je,{isOdd:M(c)},function(e){var n=e.hours,t=e.minutes,a=e.seconds;return"".concat(n?"".concat(n,":"):"").concat(t,":").concat(1==="".concat(a).length?"0":"").concat(a)}(_)),i.a.createElement(je,{isOdd:M(c),size:14},Math.round(z),"BPM"),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:b,fadeRate:.9})),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:100*T})),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:100*O})),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:100*E})),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:100*x})),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:100*j})),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:100*k})),i.a.createElement(je,{isOdd:M(c)},i.a.createElement(de,{percentage:100*P})),i.a.createElement(je,{isOdd:M(c),size:14},g[w]||"?"),i.a.createElement(je,{isOdd:M(c)},Math.round(S),"dB"),i.a.createElement(je,{isOdd:M(c),size:14},C?"Major":"Minor"),i.a.createElement(je,{isOdd:M(c),size:14},A),i.a.createElement(je,{isOdd:M(c)},u?i.a.createElement(Oe,null):i.a.createElement(xe,{isLoading:l,disabled:!o,onClick:function(){return!!o&&r(y,d)}})))};function Se(){var e=Object(a.a)(["\n  cursor: pointer;\n  position: absolute;\n  bottom: 4px;\n"]);return Se=function(){return e},e}function Ce(){var e=Object(a.a)(["\n  position: relative;\n  border-bottom: 1px solid ",";\n\n  p {\n    font-size: 12px;\n    font-weight: 600;\n    white-space: nowrap;\n    margin: 0;\n    position: absolute;\n    bottom: 2px;\n    left: 0;\n    transform-origin: bottom left;\n    transform: rotate(-13deg);\n  }\n"]);return Ce=function(){return e},e}function Pe(){var e=Object(a.a)(["\n  position: relative;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  height: calc(100vh - 64px - 64px);\n  width: ","px;\n  max-width: 100vw;\n  margin: 0 auto;\n  border-right: 1px solid ",";\n  border-left: 1px solid ",";\n\n  ",", "," {\n    display: grid;\n    grid-template-columns:\n      [playpause] 32px [name] 216px [explicit] 24px [artist] 148px [duration] 54px [bpm] 60px repeat(8, 70px [stats])\n      [key] 48px [db] 54px [mod] 56px [time] 25px [save] 42px;\n  }\n"]);return Pe=function(){return e},e}function ze(){var e=Object(a.a)(["\n  width: ","px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  height: calc(100vh - 64px - 64px - 40px);\n  font-size: 16px;\n\n  & > div {\n    height: 36px;\n    padding: 4px 6px;\n  }\n"]);return ze=function(){return e},e}function Ae(){var e=Object(a.a)(["\n  height: 40px;\n  margin-bottom: 8px;\n  background-color: ",";\n"]);return Ae=function(){return e},e}var Te=s.b.div(Ae(),b),Me=s.b.div(ze(),1319),_e=s.b.div(Pe(),1319,v,v,Te,Me),Fe=s.b.div(Ce(),v),Le=Object(s.b)(Ee)(Se()),Ie=function(e){var n,t=e.searchResults,a=e.activeSong,r=e.isPlaying,o=e.handleSortSongs,c=e.handleSaveSongToPlaylist,l=e.handlePlayPauseSong,u=e.activePlaylistId,s=e.isSavingToPlaylist,d=e.activePlaylist;return i.a.createElement(_e,null,i.a.createElement(Te,null,i.a.createElement(Fe,null),i.a.createElement(Fe,{onClick:function(){return o("name")}},i.a.createElement("p",null,"Name")),i.a.createElement(Fe,{onClick:function(){return o("explicit")}},i.a.createElement(Le,null)),i.a.createElement(Fe,{onClick:function(){return o("artists")}},i.a.createElement("p",null,"Artist")),i.a.createElement(Fe,{onClick:function(){return o("duration_ms")}},i.a.createElement("p",null,"Duration")),i.a.createElement(Fe,{onClick:function(){return o("tempo")}},i.a.createElement("p",null,"Tempo")),i.a.createElement(Fe,{onClick:function(){return o("popularity")}},i.a.createElement("p",null,"Popularity")),i.a.createElement(Fe,{onClick:function(){return o("valence")}},i.a.createElement("p",null,"Valence")),i.a.createElement(Fe,{onClick:function(){return o("danceability")}},i.a.createElement("p",null,"Danceability")),i.a.createElement(Fe,{onClick:function(){return o("energy")}},i.a.createElement("p",null,"Energy")),i.a.createElement(Fe,{onClick:function(){return o("acousticness")}},i.a.createElement("p",null,"Acousticness")),i.a.createElement(Fe,{onClick:function(){return o("instrumentalness")}},i.a.createElement("p",null,"Instrumental")),i.a.createElement(Fe,{onClick:function(){return o("liveness")}},i.a.createElement("p",null,"Liveness")),i.a.createElement(Fe,{onClick:function(){return o("speechiness")}},i.a.createElement("p",null,"Speechiness")),i.a.createElement(Fe,{onClick:function(){return o("key")}},i.a.createElement("p",null,"Key")),i.a.createElement(Fe,{onClick:function(){return o("loudness")}},i.a.createElement("p",null,"Loudness")),i.a.createElement(Fe,{onClick:function(){return o("mode")}},i.a.createElement("p",null,"Modality")),i.a.createElement(Fe,{onClick:function(){return o("time-signature")}},i.a.createElement("p",null,"Meter")),i.a.createElement(Fe,null)),i.a.createElement(Me,null,!!(null===t||void 0===t||null===(n=t.items)||void 0===n?void 0:n.length)&&(null===t||void 0===t?void 0:t.items.map((function(e,n){return i.a.createElement(ke,{key:e.id,song:e,index:n,handlePlayPauseSong:l,activeSong:a,isPlaying:r&&e.id===(null===a||void 0===a?void 0:a.id),handleSaveSongToPlaylist:c,activePlaylistId:u,isSavingToPlaylist:s==e.id,isSaved:!!d&&d.items.some((function(n){return n.track.id===e.id}))})})))))};function Ne(){var e=Object(a.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  padding: 8px;\n  border: none;\n  border-radius: 2px;\n  background-color: ",";\n  color: ",";\n  font-size: 14px;\n  line-height: 1;\n  text-align: center;\n  white-space: 'nowrap';\n  cursor: pointer;\n  outline: none;\n  font-weight: 600;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n  &:hover:not([disabled]) {\n    opacity: 0.8;\n  }\n\n  &:active {\n    opacity: 0.9;\n  }\n\n  &:focus {\n    border: 1px solid ",";\n  }\n\n  &[disabled] {\n    background-color: ",";\n  }\n"]);return Ne=function(){return e},e}var Re=Object(s.b)(T).attrs((function(){return{as:"select"}}))(Ne(),m,h,b,v);function Be(){var e=Object(a.a)(["\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  font-weight: 900;\n  font-size: 20px;\n  cursor: pointer;\n"]);return Be=function(){return e},e}function De(){var e=Object(a.a)([""]);return De=function(){return e},e}function He(){var e=Object(a.a)(["\n  display: flex;\n  align-items: center;\n  height: 40px;\n  width: 100%;\n  padding: 0 16px;\n  background-color: ",";\n  border-bottom: 1px solid ",";\n\n  "," {\n    padding: 4px 8px;\n    font-size: 12px;\n    margin-left: auto;\n    height: 22px;\n  }\n"]);return He=function(){return e},e}function Ve(){var e=Object(a.a)(["\n  width: 100%;\n"]);return Ve=function(){return e},e}function We(){var e=Object(a.a)(["\n  display: grid;\n  grid-gap: 24px;\n  padding: 24px;\n  justify-content: center;\n\n  ",", "," {\n    width: 220px;\n  }\n"]);return We=function(){return e},e}function Ue(){var e=Object(a.a)(["\n  overflow-x: hidden;\n  overflow-y: scroll;\n  height: calc(100vh - 64px - 64px - 40px);\n"]);return Ue=function(){return e},e}function Je(){var e=Object(a.a)(["\n  &&& {\n    margin-left: 16px;\n  }\n"]);return Je=function(){return e},e}function Ge(){var e=Object(a.a)(["\n  padding: 8px;\n  border: 1px solid ",";\n\n  &:active,\n  &:focus {\n    border: 1px solid ",";\n    outline: none;\n  }\n"]);return Ge=function(){return e},e}function Ke(){var e=Object(a.a)([""]);return Ke=function(){return e},e}function Xe(){var e=Object(a.a)(["\n  display: flex;\n"]);return Xe=function(){return e},e}function qe(){var e=Object(a.a)(["\n  flex: 1 1 auto;\n  text-align: center;\n  border-bottom: 1px solid ",";\n  font-weight: ",";\n  padding: 16px 8px 2px;\n  cursor: pointer;\n"]);return qe=function(){return e},e}function Ye(){var e=Object(a.a)(["\n  width: 100%;\n  display: flex;\n"]);return Ye=function(){return e},e}function $e(){var e=Object(a.a)(["\n  position: relative;\n  width: 800px;\n  max-width: calc(100vw - 32px);\n  margin-top: 24px;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  height: calc(100vh - 64px - 64px);\n"]);return $e=function(){return e},e}function Qe(){var e=Object(a.a)(["\n  position: fixed;\n  top: 12px;\n  right: 12px;\n"]);return Qe=function(){return e},e}function Ze(){var e=Object(a.a)(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n"]);return Ze=function(){return e},e}var en=s.b.div(Ze()),nn=Object(s.b)((function(e){var n=e.onClick,t=e.className;return i.a.createElement(re,{onClick:n,className:t})}))(Qe()),tn=Object(s.b)(w)($e()),an=s.b.div(Ye()),rn=s.b.div(qe(),(function(e){return e.isActive?m:v}),(function(e){return e.isActive?400:100})),on=s.b.div(Xe()),cn=s.b.label(Ke()),ln=s.b.input(Ge(),v,m),un=Object(s.b)(Re)(Je()),sn=(s.b.div(Ue()),s.b.div(We(),ln,T)),dn=s.b.div(Ve()),pn=s.b.div(He(),b,v,T),fn=s.b.p(De()),mn=s.b.div(Be()),bn=function(){var e=Object(u.b)().fetchData,n=Object(r.useRef)(new Audio),t=Object(r.useState)(!1),a=Object(D.a)(t,2),o=a[0],c=a[1],l=Object(r.useState)(""),s=Object(D.a)(l,2),d=s[0],p=s[1],f=Object(r.useState)(JSON.parse(localStorage.getItem("results")||"{}")),m=Object(D.a)(f,2),b=m[0],h=m[1],v=Object(r.useState)(),y=Object(D.a)(v,2),x=y[0],O=y[1],E=Object(r.useState)(),j=Object(D.a)(E,2),k=j[0],S=j[1];Object(r.useEffect)((function(){x||k||e("me").then((function(e){return O(e)})).catch((function(e){return S(e)}))}),[x,k]);var C=Object(r.useState)(),P=Object(D.a)(C,2),z=P[0],A=P[1],M=Object(r.useState)(),_=Object(D.a)(M,2),F=_[0],L=_[1];Object(r.useEffect)((function(){z||F||e("me/playlists").then((function(e){return A(e)})).catch((function(e){return L(e)}))}),[z,F]);var I=Object(r.useState)(),V=Object(D.a)(I,2),W=V[0],U=V[1],J=Object(r.useState)(),G=Object(D.a)(J,2),K=G[0],X=G[1];Object(r.useEffect)((function(){W||K||e("recommendations/available-genre-seeds").then((function(e){var n=e.genres;return U(n)})).catch((function(e){return X(e)}))}),[W,K]);var q=Object(r.useState)([]),Y=Object(D.a)(q,2),$=Y[0],Q=Y[1];Object(r.useEffect)((function(){if(x&&z){var e=z.items.filter((function(e){return e.owner.id===x.id}));Q(e)}}),[x,z]);var Z=Object(r.useState)([]),ee=Object(D.a)(Z,2),ne=ee[0],te=ee[1],re=Object(r.useState)({}),ie=Object(D.a)(re,2),oe=ie[0],ce=ie[1];console.log({advancedSearchInput:oe,genreSeeds:ne});var le=Object(r.useState)(),ue=Object(D.a)(le,2),se=ue[0],de=ue[1],pe=Object(r.useState)(),fe=Object(D.a)(pe,2),me=fe[0],be=fe[1],he=Object(r.useState)(!1),ve=Object(D.a)(he,2),ge=ve[0],ye=ve[1];n.current.addEventListener("playing",(function(){return ye(!0)})),n.current.addEventListener("pause",(function(){return ye(!1)})),n.current.addEventListener("ended",(function(){return ye(!1)}));var xe=Object(r.useState)(),Oe=Object(D.a)(xe,2),Ee=Oe[0],je=Oe[1],we=Object(r.useState)(),ke=Object(D.a)(we,2),Se=ke[0],Ce=ke[1],Pe=Object(r.useState)(!1),ze=Object(D.a)(Pe,2),Ae=ze[0],Te=ze[1],Me=function(){e("playlists/".concat(Ee,"/tracks")).then((function(e){Ce(e)}))};Object(r.useEffect)((function(){Ee&&Me()}),[Ee]);var _e=Object(r.useState)(!1),Fe=Object(D.a)(_e,2),Le=Fe[0],Ne=Fe[1],Re=Object(r.useState)("search"),Be=Object(D.a)(Re,2),De=Be[0],He=Be[1],Ve=Object(r.useState)("byParams"),We=Object(D.a)(Ve,2),Ue=We[0],Je=We[1];return i.a.createElement(en,null,i.a.createElement(nn,{onClick:function(){return Ne(!Le)}}),"search"===De&&i.a.createElement(tn,null,i.a.createElement(mn,{onClick:function(){return He("results")}},"X"),i.a.createElement(w.Header,null,"Search"),i.a.createElement(an,null,i.a.createElement(rn,{isActive:"byParams"===Ue,onClick:function(){return Je("byParams")}},"By song parameters"),i.a.createElement(rn,{isActive:"byName"===Ue,onClick:function(){return Je("byName")}},"By song name")),"byParams"===Ue&&i.a.createElement(i.a.Fragment,null,(null===W||void 0===W?void 0:W.length)&&W.map((function(e){return i.a.createElement("button",{onClick:function(){return n=e,void(ne.find((function(e){return e===n}))?te(ne.filter((function(e){return e!==n}))):ne.length<3&&te([].concat(Object(R.a)(ne),[n])));var n}},ne.find((function(n){return n===e}))&&"++",e)})),["acousticness","danceability","energy","instrumentalness","liveness","speechiness","valence"].map((function(e){return i.a.createElement(on,null,i.a.createElement(cn,null,e),i.a.createElement(un,{id:e,name:e,onChange:function(n){var t=n.target;return ce(Object(B.a)(Object(B.a)({},oe),{},Object(N.a)({},e,t.value)))},value:oe[e]},i.a.createElement("option",{value:null}),i.a.createElement("option",{value:"1.0"},"1.0 High"),i.a.createElement("option",{value:"0.9"},"0.9"),i.a.createElement("option",{value:"0.8"},"0.8"),i.a.createElement("option",{value:"0.7"},"0.7"),i.a.createElement("option",{value:"0.6"},"0.6"),i.a.createElement("option",{value:"0.5"},"0.5"),i.a.createElement("option",{value:"0.4"},"0.4"),i.a.createElement("option",{value:"0.3"},"0.3"),i.a.createElement("option",{value:"0.2"},"0.2"),i.a.createElement("option",{value:"0.1"},"0.1"),i.a.createElement("option",{value:"0.0"},"0.0 Low")))})),i.a.createElement(on,null,i.a.createElement(cn,null,"Popularity (0-8)"),i.a.createElement(ln,{id:"popularity",name:"popularity",onChange:function(e){var n=e.target;return ce(Object(B.a)(Object(B.a)({},oe),{},{popularity:n.value}))},value:oe.popularity||"",type:"number",min:"1",max:"8"})),i.a.createElement(on,null,i.a.createElement(cn,null,"Time Signature (0-100)"),i.a.createElement(ln,{id:"timeSignature",name:"timeSignature",onChange:function(e){var n=e.target;return ce(Object(B.a)(Object(B.a)({},oe),{},{timeSignature:n.value}))},value:oe.timeSignature||"",type:"number",min:"0",max:"100"})),i.a.createElement(on,null,i.a.createElement(cn,null,"Tempo"),i.a.createElement(ln,{id:"tempo",name:"tempo",onChange:function(e){var n=e.target;return ce(Object(B.a)(Object(B.a)({},oe),{},{tempo:n.value}))},value:oe.tempo||"",type:"number",min:"1"})),i.a.createElement(on,null,i.a.createElement(cn,null,"Mode"),i.a.createElement(un,{id:"mode",name:"mode",onChange:function(e){var n=e.target;return ce(Object(B.a)(Object(B.a)({},oe),{},{mode:n.value}))},value:oe.mode},i.a.createElement("option",{value:null}),i.a.createElement("option",{value:"1"},"Major"),i.a.createElement("option",{value:"0"},"Minor"))),i.a.createElement(on,null,i.a.createElement(cn,null,"Key"),i.a.createElement(un,{id:"key",name:"key",onChange:function(e){var n=e.target;return ce(Object(B.a)(Object(B.a)({},oe),{},{key:n.value}))},value:oe.mode},i.a.createElement("option",{value:null}),Object.entries(g).map((function(e){var n=Object(D.a)(e,2),t=n[0],a=n[1];return i.a.createElement("option",{value:t},a)})))),i.a.createElement(T,{onClick:function(){!function(){var n=oe.acousticness,t=oe.danceability,a=oe.energy,r=oe.instrumentalness,i=oe.key,o=oe.mode,l=oe.liveness,u=oe.popularity,s=oe.speechiness,d=oe.tempo,p=oe.timeSignature,f=oe.valence;c(!0);var m=Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)(Object(B.a)({},!!(null===ne||void 0===ne?void 0:ne.length)&&{seed_genres:ne.join(",")}),!!n&&{target_acousticness:n}),!!t&&{target_danceability:t}),!!a&&{target_energy:a}),!!r&&{target_instrumentalness:r}),!!l&&{target_liveness:l}),!!s&&{target_speechiness:s}),!!f&&{target_valence:f}),!!u&&{target_popularity:u}),!!p&&{target_time_signature:p}),!!d&&{target_tempo:d}),!!o&&{target_mode:o}),!!i&&{target_key:i}),{},{limit:20,market:"US"});e("recommendations".concat(Object(H.a)(m))).then((function(n){var t,a=(null===n||void 0===n||null===(t=n.tracks)||void 0===t?void 0:t.items)||(null===n||void 0===n?void 0:n.tracks)||[],r=a.map((function(e){return e.id}));e("audio-features?ids=".concat(r)).then((function(e){var t=e.audio_features,r=Object(B.a)(Object(B.a)({},n),{},{items:Object(R.a)(a.map((function(e,n){return Object(B.a)(Object(B.a)({},e),{},{audioFeatures:t[n]})})))});h(r),localStorage.setItem("results",JSON.stringify(r))}))})).finally((function(){return c(!1)}))}(),He("results")},disabled:!ne.length},"Search")),"byName"===Ue&&i.a.createElement(sn,null,i.a.createElement(ln,{placeholder:"Song name..",value:d,onChange:function(e){var n=e.target;return p(n.value)},name:"byName"}),i.a.createElement(T,{onClick:function(){c(!0),e("search?q=".concat(encodeURIComponent(d),"&type=track&limit=20")).then((function(n){var t=n.tracks,a=t.items.map((function(e){return e.id}));e("audio-features?ids=".concat(a)).then((function(e){var n=e.audio_features,a=Object(B.a)(Object(B.a)({},t),{},{items:Object(R.a)(t.items.map((function(e,t){return Object(B.a)(Object(B.a)({},e),{},{audioFeatures:n[t]})})))});h(a),localStorage.setItem("results",JSON.stringify(a))}))})).finally((function(){return c(!1)})),He("results")},disabled:!d},"Search"))),"results"===De&&i.a.createElement(dn,null,i.a.createElement(pn,null,i.a.createElement(cn,{for:"playlists"},"Playlist: "),i.a.createElement(un,{id:"playlists",name:"playlists",onChange:function(e){var n=e.target;return je(n.value)},value:Ee},i.a.createElement("option",{disabled:!0,selected:!0},"Select a playlist"),!!$&&$.map((function(e){return i.a.createElement("option",{key:e.id,value:e.id},e.name)}))),i.a.createElement(T,{onClick:function(){return He("search")}},"Search Again")),o?i.a.createElement("div",null,"Loading"):b?i.a.createElement(i.a.Fragment,null,i.a.createElement(Ie,{searchResults:b,activeSong:me,isPlaying:ge,handleSortSongs:function(e){var n=(null===b||void 0===b?void 0:b.items)||[];e===se?n=n.reverse():(n=n.sort((function(n,t){var a=n[e]||n.audioFeatures[e],r=t[e]||t.audioFeatures[e];return Array.isArray(a)&&(a=a.map((function(e){var n=e.name;return"".concat(n)}))),Array.isArray(r)&&(r=r.map((function(e){var n=e.name;return"".concat(n)}))),"string"===typeof a&&(a=a.toLowerCase()),"string"===typeof r&&(r=r.toLowerCase()),r===a?0:r<a?-1:1})),de(e)),h(Object(B.a)(Object(B.a)({},b),{},{items:Object(R.a)(n)}))},handleSaveSongToPlaylist:function(n,t){Te(t),e("playlists/".concat(Ee,"/tracks?uris=").concat(n),"POST").then((function(){return Me()})).catch((function(e){return console.log(e)})).finally((function(){return Te(!1)}))},handlePlayPauseSong:function(e){me&&e.id===me.id?n.current.paused?n.current.play():n.current.pause():(n.current.src=e.preview_url,n.current.play(),be(e))},activePlaylistId:Ee,isSavingToPlaylist:Ae,activePlaylist:Se})):i.a.createElement(fn,null,"No Results. Please modify your search criteria and try again.")),i.a.createElement(ae,{isOpen:Le,close:function(){return Ne(!1)}}))},hn=function(){var e=Object(u.b)(),n=e.isAuthed;return e.error?i.a.createElement(z,null):n?i.a.createElement(bn,null):i.a.createElement(I,null)};function vn(){var e=Object(a.a)(["\n  font-weight: 400;\n  margin: auto;\n"]);return vn=function(){return e},e}function gn(){var e=Object(a.a)(["\n  font-size: ","px;\n  font-size: calc(\n    ","px + (",") *\n      ((100vw - ","px) / (","))\n  );\n  @media (min-width: ","px) {\n    font-size: ","px;\n  }\n  @media (max-width: ","px) {\n    font-size: ","px;\n  }\n"]);return gn=function(){return e},e}function yn(){var e=Object(a.a)(["\n  height: 32px;\n  align-self: center;\n  @media (max-width: 600px) {\n    height: 24px;\n  }\n"]);return yn=function(){return e},e}function xn(){var e=Object(a.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  width: 100vw;\n  height: 64px;\n  padding: 0 40px 0 16px;\n  background-color: ",";\n  border-bottom: 8px solid ",";\n"]);return xn=function(){return e},e}var On=s.b.header(xn(),b,m),En=s.b.img.attrs((function(){return{src:"/spotify-logo.png"}}))(yn()),jn=s.b.p(gn(),(function(e){return(e.max+e.min)/2}),(function(e){return e.min}),(function(e){return e.max-e.min}),(function(e){return e.screenMin}),(function(e){return e.screenMax-e.screenMin}),(function(e){return e.screenMax}),(function(e){return e.max}),(function(e){return e.screenMin}),(function(e){return e.min})),wn=Object(s.b)(jn).attrs((function(){return{as:"h1",min:16,max:32,screenMin:500,screenMax:900}}))(vn()),kn=function(){return i.a.createElement(On,null,i.a.createElement(En,null),i.a.createElement(wn,null,"Advanced Search and Playlist Creator for Spotify"))};function Sn(){var e=Object(a.a)(["\n  height: 100%;\n"]);return Sn=function(){return e},e}function Cn(){var e=Object(a.a)(["\n  height: 16px;\n  width: 16px;\n  margin-bottom: 4px;\n"]);return Cn=function(){return e},e}function Pn(){var e=Object(a.a)(["\n  margin: 0;\n  font-size: 8px;\n  padding-right: 8px;\n  color: ",";\n  text-decoration: none;\n"]);return Pn=function(){return e},e}function zn(){var e=Object(a.a)(["\n  display: flex;\n  width: 100vw;\n  height: 24px;\n  border-top: 1px solid ",";\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 16px;\n  background-color: ",";\n"]);return zn=function(){return e},e}var An=s.b.footer(zn(),v,b),Tn=s.b.a.attrs((function(){return{href:"https://www.linkedin.com/in/calvinshell/",target:"_blank"}}))(Pn(),h),Mn=s.b.a.attrs((function(){return{href:"https://github.com/cshell7/spotify-advanced-search-and-playlist-creator",target:"_blank"}}))(Cn()),_n=s.b.img.attrs((function(){return{src:"/github-icon.png"}}))(Sn()),Fn=function(){return i.a.createElement(An,null,i.a.createElement(Tn,null,"Created by Calvin Shell"),i.a.createElement(Mn,null,i.a.createElement(_n,null)))};function Ln(){var e=Object(a.a)(["\n  display: flex;\n  flex: 1 0 auto;\n  overflow: hidden;\n  max-height: calc(100vh - 64px - 24px);\n"]);return Ln=function(){return e},e}function In(){var e=Object(a.a)(["\n  height: 100vh;\n  width: 100vw;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n"]);return In=function(){return e},e}var Nn=s.b.div(In()),Rn=s.b.main(Ln());c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(x,null),i.a.createElement(Nn,null,i.a.createElement(l.a,null,i.a.createElement(u.a,{clientId:"0de862dbfe1046f2b32868949aab59b4"},i.a.createElement(kn,null),i.a.createElement(Rn,null,i.a.createElement(hn,null)),i.a.createElement(Fn,null))))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/spotify-advanced-search-and-playlist-creator",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/spotify-advanced-search-and-playlist-creator","/service-worker.js");d?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):p(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):p(n,e)}))}}()}},[[31,1,2]]]);
//# sourceMappingURL=main.f22d7315.chunk.js.map