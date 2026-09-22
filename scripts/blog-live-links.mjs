import {auditSource} from "../server/blog/links.ts";
import {SOURCES} from "../server/blog/catalog.ts";
for(const source of SOURCES){const {record}=await auditSource(source.url,"integration-verification");console.log(JSON.stringify({url:record.url,status:record.http_status,health:record.health,score:record.score,approved:record.approved}));}
