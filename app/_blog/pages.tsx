import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {listPosts,publicPost,translations} from "../../server/blog/posts";
import {articleHtml} from "../../server/blog/render";
import {ownedMediaUrl} from "../../server/blog/media-url";
import {wordCount} from "../../server/blog/content";
import type {Language,Post} from "../../server/blog/types";
import {DOMAIN} from "../../shared/seo-data";
import BlogChrome from "./chrome";
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
 return <BlogChrome languageLinks={{en:"/blog",es:"/es/blog"}}><main className="blog-wrap"><header className="blog-hero"><p className="blog-eyebrow">{es?"EL DIARIO DE FAITHFUL CARE":"THE FAITHFUL CARE JOURNAL"}</p><h1>{es?<>Más claridad.<br/>Más confianza en tu cuidado.</>:<>A little more clarity.<br/>A lot more confidence.</>}</h1><p>{es?"Guías para entender tu salud, preparar tus visitas y acompañar a quienes quieres.":"Thoughtful guidance for understanding your health, preparing for care and supporting the people you love."}</p></header>{posts.length?<div className="blog-grid">{posts.map(p=><article className="blog-card" key={p.id}>{ownedMediaUrl(p.data.hero)&&<Link href={path(p)} tabIndex={-1} aria-hidden><img src={p.data.hero} alt="" loading="lazy"/></Link>}<p className="blog-eyebrow">{p.data.category.replaceAll("-"," ")}</p><h2><Link href={path(p)}>{p.title}</Link></h2><p>{p.data.excerpt}</p><small>{Math.max(1,Math.ceil(wordCount(p.content)/220))} min · {es?"Leer artículo":"Read article"}</small></article>)}</div>:<section className="blog-empty"><h2>{es?"Estamos preparando recursos para ti.":"Good information takes care."}</h2><p>{es?"Pronto encontrarás artículos revisados para ayudarte a tomar decisiones informadas. Mientras tanto, conoce nuestros servicios.":"We’re preparing carefully reviewed resources to help you feel more informed. In the meantime, explore how our team can support your care."}</p><Link className="blog-translation" href={es?"/es/medico-de-familia-naples":"/primary-care"}>{es?"Conoce nuestros servicios":"Explore our care"}</Link></section>}</main></BlogChrome>;
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
 const es=language==="es";const url=DOMAIN+path(post);
 const schema={"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.data.excerpt,url,mainEntityOfPage:url,inLanguage:language,
 datePublished:post.published_at,dateModified:post.updated_at,author:{"@type":"Organization",name:"Faithful Care Medical Services",url:DOMAIN},
 publisher:{"@type":"Organization",name:"Faithful Care Medical Services",url:DOMAIN},...(ownedMediaUrl(post.data.hero)?{image:post.data.hero}:{})};
 return <BlogChrome languageLinks={{en:siblings.find(p=>p.language==="en")?path(siblings.find(p=>p.language==="en")!):"/blog",es:siblings.find(p=>p.language==="es")?path(siblings.find(p=>p.language==="es")!):"/es/blog"}}><main className="blog-article" data-blog-post-id={post.id} data-blog-version={post.version}><Link href={(es?"/es":"")+"/blog"} className="blog-eyebrow">{es?"← Diario de salud":"← Health & Care Journal"}</Link><h1>{post.title}</h1><p className="intro">{post.data.excerpt}</p><div className="blog-meta"><span>{post.data.author}</span>{post.data.reviewConfirmed&&<span>{es?"Revisión clínica":"Clinical review"}: {post.data.reviewer}</span>}<span>{new Date(post.published_at!).toLocaleDateString(es?"es-US":"en-US",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"})}</span></div>{other&&<Link className="blog-translation" href={path(other)} hrefLang={other.language}>{es?"Read in English":"Leer en español"}</Link>}{ownedMediaUrl(post.data.hero)&&<img src={post.data.hero} alt={post.data.heroAlt}/>}<div className="blog-copy" dangerouslySetInnerHTML={{__html:articleHtml(post)}}/><aside className="blog-disclaimer">{post.data.disclaimer}</aside><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/></main></BlogChrome>;
}
