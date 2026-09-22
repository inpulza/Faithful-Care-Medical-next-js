import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {listPosts,publicPost,translations} from "../../server/blog/posts";
import {articleHtml,articleHeadings} from "../../server/blog/render";
import {ownedMediaUrl} from "../../server/blog/media-url";
import {wordCount} from "../../server/blog/content";
import type {Language,Post} from "../../server/blog/types";
import {verifiedBlogAuthor,blogAuthorSchema} from "../../shared/blog-author";
import {DOMAIN} from "../../shared/seo-data";
import BlogChrome from "./chrome";
import Contents from "./contents";
import Archive from "./archive";
import "../blog.css";
const path=(p:Post)=>(p.language==="es"?"/es":"")+"/blog/"+p.slug;
export function enabled(){return process.env.BLOG_ENABLED==="true";}
export function indexMetadata(language:Language):Metadata{
 const es=language==="es";return {title:es?"Salud y bienestar | Faithful Care":"Health & Care Journal | Faithful Care",
 description:es?"Información clara sobre atención primaria, prevención y cuidados paliativos.":"Clear information about primary care, prevention and palliative care.",
 alternates:{canonical:DOMAIN+(es?"/es":"")+"/blog",languages:{en:DOMAIN+"/blog",es:DOMAIN+"/es/blog","x-default":DOMAIN+"/blog"}}};
}
export async function IndexPage({language}:{language:Language}){
 if(!enabled())notFound();const posts=await listPosts(language);const es=language==="es";
 return <BlogChrome languageLinks={{en:"/blog",es:"/es/blog"}}><main className="blog-wrap"><header className="blog-hero"><p className="blog-eyebrow">{es?"EL DIARIO DE FAITHFUL CARE":"THE FAITHFUL CARE JOURNAL"}</p><h1>{es?<>Más claridad.<br/>Más confianza en tu cuidado.</>:<>A little more clarity.<br/>A lot more confidence.</>}</h1><p>{es?"Guías para entender tu salud, preparar tus visitas y acompañar a quienes quieres.":"Thoughtful guidance for understanding your health, preparing for care and supporting the people you love."}</p></header>{posts.length?<Archive es={es} posts={posts.map(p=>({id:p.id,title:p.title,href:path(p),excerpt:p.data.excerpt,category:p.data.category,hero:ownedMediaUrl(p.data.hero)?p.data.hero:"",minutes:Math.max(1,Math.ceil(wordCount(p.content)/220)),date:new Date(p.published_at!).toLocaleDateString(es?"es-US":"en-US",{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"})}))}/>:<section className="blog-empty"><h2>{es?"Estamos preparando recursos para ti.":"Good information takes care."}</h2><p>{es?"Pronto encontrarás artículos revisados para ayudarte a tomar decisiones informadas. Mientras tanto, conoce nuestros servicios.":"We’re preparing carefully reviewed resources to help you feel more informed. In the meantime, explore how our team can support your care."}</p><Link className="blog-translation" href={es?"/es/medico-de-familia-naples":"/primary-care"}>{es?"Conoce nuestros servicios":"Explore our care"}</Link></section>}</main></BlogChrome>;
}
export async function articleMetadata(language:Language,slug:string):Promise<Metadata>{
 if(!enabled())notFound();const post=await publicPost(language,slug);if(!post)notFound();const siblings=await translations(post);
 const languages=Object.fromEntries(siblings.map(p=>[p.language,DOMAIN+path(p)]));
 return {title:{absolute:post.data.metaTitle||post.title},description:post.data.metaDescription||post.data.excerpt,
 alternates:{canonical:DOMAIN+path(post),languages},
 openGraph:{type:"article",title:post.data.metaTitle||post.title,description:post.data.excerpt,url:DOMAIN+path(post),...(ownedMediaUrl(post.data.hero)?{images:[{url:post.data.hero,alt:post.data.heroAlt}]}:{})},
 robots:{index:true,follow:true}};
}
export async function ArticlePage({language,slug}:{language:Language;slug:string}){
 if(!enabled())notFound();const post=await publicPost(language,slug);if(!post)notFound();const siblings=await translations(post);const other=siblings.find(p=>p.language!==language);
 const es=language==="es";const url=DOMAIN+path(post);const author=verifiedBlogAuthor(post.data.author);
 const related=(await listPosts(language)).filter(p=>p.id!==post.id).sort((a,b)=>Number(b.data.category===post.data.category)-Number(a.data.category===post.data.category)).slice(0,3);
 const schema={"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.data.excerpt,url,mainEntityOfPage:url,inLanguage:language,
 datePublished:post.published_at,dateModified:post.updated_at,author:blogAuthorSchema(post.data.author,DOMAIN),
 publisher:{"@type":"Organization",name:"Faithful Care Medical Services",url:DOMAIN},...(ownedMediaUrl(post.data.hero)?{image:post.data.hero}:{})};
 return <BlogChrome languageLinks={{en:siblings.find(p=>p.language==="en")?path(siblings.find(p=>p.language==="en")!):"/blog",es:siblings.find(p=>p.language==="es")?path(siblings.find(p=>p.language==="es")!):"/es/blog"}}><main id="article-top" className="blog-article" data-blog-post-id={post.id} data-blog-version={post.version}><Link href={(es?"/es":"")+"/blog"} className="blog-eyebrow">{es?"← Diario de salud":"← Health & Care Journal"}</Link><h1>{post.title}</h1><p className="intro">{post.data.excerpt}</p><div className="blog-meta">{author?<Link className="blog-author" href={author.biography} rel="author"><span className="blog-author-avatar"><img src={author.image} alt="" width={56} height={56}/></span><span><small>{es?"Por":"By"}</small><strong>{author.name}</strong><span className="blog-author-bio">{es?"Conoce a la doctora":"Meet your doctor"} →</span></span></Link>:<span>{post.data.author}</span>}{post.data.reviewConfirmed&&<span>{es?"Revisión clínica":"Clinical review"}: {post.data.reviewer}</span>}<span>{new Date(post.published_at!).toLocaleDateString(es?"es-US":"en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"})}</span></div>{other&&<Link className="blog-translation" href={path(other)} hrefLang={other.language}>{es?"Read in English":"Leer en español"}</Link>}{ownedMediaUrl(post.data.hero)&&<img src={post.data.hero} alt={post.data.heroAlt}/>}<div className="article-reading-layout"><Contents headings={articleHeadings(post)} es={es}/><div><div className="blog-copy" dangerouslySetInnerHTML={{__html:articleHtml(post)}}/><aside className="blog-disclaimer">{post.data.disclaimer}</aside>{post.data.tags.length>0&&<div className="article-tags">{post.data.tags.map(t=><span className="blog-pill" key={t}>{t}</span>)}</div>}<section className="article-sources"><h2>{es?"Fuentes consultadas":"Sources consulted"}</h2><ul>{post.data.sources.map(source=><li key={source}><a href={source} target="_blank" rel="noreferrer">{source}</a></li>)}</ul></section></div></div>{related.length>0&&<section className="related-articles"><p className="blog-eyebrow">{es?"SIGUE EXPLORANDO":"KEEP EXPLORING"}</p><h2>{es?"Más información para tu cuidado":"More guidance for your care"}</h2><div className="blog-grid">{related.map(p=><article className="blog-card" key={p.id}>{ownedMediaUrl(p.data.hero)&&<img src={p.data.hero} alt="" loading="lazy"/>}<p className="blog-eyebrow">{p.data.category.replaceAll("-"," ")}</p><h3><Link href={path(p)}>{p.title}</Link></h3><p>{p.data.excerpt}</p></article>)}</div></section>}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/></main></BlogChrome>;
}
