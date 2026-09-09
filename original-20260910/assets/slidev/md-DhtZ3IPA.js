import{$ as e,B as t,D as n,S as r,T as i,U as a,_ as o,b as s,bt as c,v as l,vt as u,x as d,xt as f,y as p}from"../modules/shiki-CIR8J2mL.js";import{n as m,t as h}from"./context-Cq7ax2QY.js";function g(e){return e.startsWith(`/`)?`/seah-ax-deck/original-20260910/`+e.slice(1):e}function _(e,t=!1){let n=e&&[`#`,`rgb`,`hsl`].some(t=>e.indexOf(t)===0),r={background:n?e:void 0,color:e&&!n?`white`:void 0,backgroundImage:n?void 0:e?t?`linear-gradient(#0005, #0008), url(${g(e)})`:`url("${g(e)}")`:void 0,backgroundRepeat:`no-repeat`,backgroundPosition:`center`,backgroundSize:`cover`};return r.background||delete r.background,r}var v={class:`my-auto w-full`},y=i({__name:`cover`,props:{background:{default:``}},setup(e){let{$slidev:n,$nav:r,$clicksContext:i,$clicks:s,$page:c,$renderContext:u,$frontmatter:p}=m(),h=e,g=o(()=>_(h.background,!0));return(e,n)=>(t(),d(`div`,{class:`slidev-layout cover`,style:f(g.value)},[l(`div`,v,[a(e.$slots,`default`)])],4))}}),b={__name:`slides.md__slidev_1`,setup(i){let{$slidev:a,$nav:o,$clicksContext:d,$clicks:f,$page:g,$renderContext:_,$frontmatter:v}=m();return d.setup(),(i,a)=>(t(),p(y,c(n(u(h)(u(v),0))),{default:e(()=>[s(`
  대상: 세아그룹 실무자. 엑셀은 능숙, 코드는 처음. Windows.
  시작 상태: 노트북 + Claude 데스크톱 앱(Code 탭). 준비물 없음.
  종료 수행: PRD 를 채우고, 만든 것이 맞는지 확인할 방법을 붙여 배포한다.
  오개념: (1) 한 줄로 되는데 왜 배우나 (2) 에러가 안 나면 잘 된 것

  장표 제목 규칙 — 제목은 라벨(명사구 8~14자), 결론은 본문 첫 줄(.lead).
  서술형 종결과 두 문장 제목은 쓰지 않는다.

  그림 출처 — images/official/* 는 Claude Code 릴리스 노트의 공식 자산
  (영상은 대표 프레임 추출). images/docs/* 는 공식 문서 해당 구간 캡처.
  images/lab/* 는 실습 중 직접 찍은 화면(번호 박스는 annotate-steps.mjs 로 구움).
  scripts/fetch-official.mjs · clip-docs.mjs · annotate-steps.mjs 로 다시 만든다.
`),a[0]||=l(`div`,{class:`cover-telemetry`},[l(`span`,null,`세아그룹`),l(`span`,null,`14시간`)],-1),a[1]||=l(`div`,{class:`title-block`},[l(`div`,{class:`latin-mark`},`CLAUDE CODE`),l(`h1`,null,[r(`Claude Code 활용`),l(`br`),l(`em`,null,`PRD 작성`),r(` 및 개발`)]),l(`p`,{class:`cover-sub`},`계획을 문서로 고정하고, 만든 것이 맞는지 확인하며 개발하는 과정`)],-1)]),_:1},16))}};export{b as default};