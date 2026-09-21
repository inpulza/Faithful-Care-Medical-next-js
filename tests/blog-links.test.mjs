import assert from "node:assert/strict";import {test} from "node:test";
import {publicIpv4,allowedSource,readSource} from "../server/blog/links.ts";
test("source checking rejects arbitrary hosts and private addresses",async()=>{
 for(const ip of ["127.0.0.1","10.1.2.3","169.254.169.254","172.16.0.1","192.168.1.2","100.64.1.1","198.18.0.1","0.0.0.0","255.255.255.255","999.1.2.3","::1"])assert.equal(publicIpv4(ip),false,ip);
 assert.equal(publicIpv4("8.8.8.8"),true);
 for(const url of ["https://medlineplus.gov.evil.test/diabetes.html","http://medlineplus.gov/diabetes.html","https://127.0.0.1/","https://medlineplus.gov/diabetes.html?redirect=x","https://user@medlineplus.gov/diabetes.html"]) {assert.equal(allowedSource(url),undefined);await assert.rejects(()=>readSource(url),e=>e.status===400);}
 assert(allowedSource("https://medlineplus.gov/diabetes.html"));
});

test("automatic qualification ignores legacy approval and rejects stale or non-catalog records",async()=>{
 const {qualifiedSource}=await import("../server/blog/links.ts");
 const record={url:"https://medlineplus.gov/diabetes.html",approved:false,health:"healthy",score:100,checked_at:new Date().toISOString()};
 assert.equal(qualifiedSource(record),true);
 for(const changed of [{health:"broken"},{score:69},{checked_at:null},{checked_at:new Date(Date.now()-8*86400000).toISOString()},{url:"https://example.com"}])assert.equal(qualifiedSource({...record,...changed}),false);
});
