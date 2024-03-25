import{r as t,bA as te,bB as e}from"./vendor-c3fe08cd.js";import{R as se,G as ne,V as N,u as d,S as oe,E as ae,Q as ie,A as re,a as _,b as le,c as ce,r as h,i as I,T as ue,g as E,d as pe,f as de}from"./index-24276f89.js";import{E as he}from"./EvaluationInput-a43b4d05.js";import{h as me}from"./fluentui-icons-cc8a82c3.js";import{m as Se,l as ge,D as _e,T as fe,C as Q}from"./fluentui-react-3f437ee8.js";const Ce="_oneshotContainer_1peuc_1",xe="_oneshotTopSection_1peuc_15",ve="_oneshotBottomSection_1peuc_29",Te="_oneshotTitle_1peuc_49",Ae="_oneshotQuestionInput_1peuc_79",be="_oneshotAnswerContainer_1peuc_93",ye="_oneshotAnalysisPanel_1peuc_107",Pe="_oneshotSettingsSeparator_1peuc_117",je="_settingsButton_1peuc_125",n={oneshotContainer:Ce,oneshotTopSection:xe,oneshotBottomSection:ve,oneshotTitle:Te,oneshotQuestionInput:Ae,oneshotAnswerContainer:be,oneshotAnalysisPanel:ye,oneshotSettingsSeparator:Pe,settingsButton:je};function ke(){const[f,m]=t.useState(!1),[u,R]=t.useState(""),[C,we]=t.useState(""),[x,Be]=t.useState(""),[V,Fe]=t.useState(se.Hybrid),[G,Ne]=t.useState(5),[O,Ie]=t.useState(!0),[U,Ee]=t.useState(!1),[v,Qe]=t.useState(!1),[L,Re]=t.useState(ne.TextAndImages),[T,Ve]=t.useState(""),[A,D]=t.useState(""),[q,Ge]=t.useState([N.Embedding,N.ImageEmbedding]),[b,M]=t.useState(!1),[y,H]=t.useState(!1),[Oe,z]=t.useState(!1),P=t.useRef(""),[r,j]=t.useState(!1),[l,k]=t.useState(),[a,K]=t.useState(),[w,B]=t.useState(),[p,c]=t.useState(void 0),i=d?te().instance:void 0,W=async()=>{const s=i?await E(i):void 0;pe(s).then(o=>{z(o.showGPT4VOptions)})};t.useEffect(()=>{W()},[]);const S=async s=>{P.current=s,l&&k(void 0),j(!0),B(void 0),c(void 0);const o=i?await E(i):void 0;try{const g={messages:[{content:s,role:"user"}],context:{overrides:{prompt_template:u.length===0?void 0:u,prompt_template_prefix:C.length===0?void 0:C,prompt_template_suffix:x.length===0?void 0:x,exclude_category:T.length===0?void 0:T,top:G,retrieval_mode:V,semantic_ranker:O,semantic_captions:U,use_oid_security_filter:b,use_groups_security_filter:y,vector_fields:q,use_gpt4v:v,gpt4v_input:L}},session_state:a?a.choices[0].session_state:null},ee=await de(g,o);K(ee)}catch(g){k(g)}finally{j(!1)}},Z=(s,o)=>{R(o||"")},J=s=>{S(s),D(s)},X=s=>{w===s&&p===_.CitationTab?c(void 0):(B(s),c(_.CitationTab))},F=s=>{c(p===s?void 0:s)},Y=(s,o)=>{M(!!o)},$=(s,o)=>{H(!!o)};return e.jsxs("div",{className:n.oneshotContainer,children:[e.jsxs("div",{className:n.oneshotTopSection,children:[e.jsx(oe,{className:n.settingsButton,onClick:()=>m(!f)}),e.jsx("h2",{children:"Athena KI-Testphase: Feedback zur Qualität im Teamskanal erwünscht!"}),e.jsx(me,{fontSize:"120px",primaryFill:"#9CBF2B","aria-hidden":"true","aria-label":"Chatgpt logo"}),e.jsx("h1",{className:n.oneshotTitle,children:"Stelle eine Frage an die PCS-Wissensdatenbank und bewerte anschließend die Antwort."}),e.jsx("h3",{children:'Wenn du einen Produktnamen in deiner Frage verwenden willst, gib diesen in "" an. Zum Beispiel "INTUS ACM40e".'}),e.jsx(ae,{onExampleClicked:J,useGPT4V:v,tabName:"qa"}),e.jsx("div",{className:n.oneshotQuestionInput,children:e.jsx(ie,{placeholder:"... ?",disabled:r,initQuestion:A,onSend:s=>S(s)})})]}),e.jsxs("div",{className:n.oneshotBottomSection,children:[r&&e.jsx(Se,{label:"Athena arbeitet ..."}),!r&&a&&!l&&e.jsx("div",{className:n.oneshotAnswerContainer,children:e.jsx(re,{answer:a,isStreaming:!1,onCitationClicked:s=>X(s),onThoughtProcessClicked:()=>F(_.ThoughtProcessTab)})}),l?e.jsx("div",{className:n.oneshotAnswerContainer,children:e.jsx(le,{error:l.toString(),onRetry:()=>S(P.current)})}):null,p&&a&&e.jsx(ce,{className:n.oneshotAnalysisPanel,activeCitation:w,onActiveTabChanged:s=>F(s),citationHeight:"600px",answer:a,activeTab:p})]}),e.jsx("div",{className:n.emailBottomSection,children:e.jsx("div",{className:n.emailQuestionInput,children:!r&&a&&!l&&e.jsx(he,{disabled:r,question:A,answer:a,tabName:"qaDetail",prompt:u})})}),e.jsxs(ge,{headerText:"Konfigurieren Sie die Erstellung von Antworten",isOpen:f,isBlocking:!1,onDismiss:()=>m(!1),closeButtonAriaLabel:"Close",onRenderFooterContent:()=>e.jsx(_e,{onClick:()=>m(!1),children:"Close"}),isFooterAtBottom:!0,children:[e.jsx(fe,{className:n.oneshotSettingsSeparator,defaultValue:u,label:"Prompt Vorlage überschreiben",multiline:!0,autoAdjustHeight:!0,onChange:Z}),d&&e.jsx(Q,{className:n.oneshotSettingsSeparator,checked:b||h,label:"Use oid security filter",disabled:!I(i)||h,onChange:Y}),d&&e.jsx(Q,{className:n.oneshotSettingsSeparator,checked:y||h,label:"Use groups security filter",disabled:!I(i)||h,onChange:$}),d&&e.jsx(ue,{})]})]})}ke.displayName="QADetail";export{ke as Component};
//# sourceMappingURL=QADetail-3ea48f4b.js.map