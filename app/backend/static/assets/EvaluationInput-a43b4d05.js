import{bA as O,r as i,bB as t}from"./vendor-c3fe08cd.js";import{u as ee,r as te,i as ne,g as se,h as ae}from"./index-24276f89.js";import{S as a,k as y,T as c,I as oe}from"./fluentui-react-3f437ee8.js";const ie="_evaluationContainer_1jfqt_1",re="_evaluationInputTextContainer_1jfqt_11",le="_evaluationInputContainer_1jfqt_25",ce="_evaluationInputTextArea_1jfqt_39",ue="_evaluationInputButtonsContainer_1jfqt_49",n={evaluationContainer:ie,evaluationInputTextContainer:re,evaluationInputContainer:le,evaluationInputTextArea:ce,evaluationInputButtonsContainer:ue},R=ee?O().instance:void 0,S={dropdown:{width:300}},he=[{key:"ja",text:"Ja"},{key:"teils",text:"Teils"},{key:"nein",text:"Nein"}],pe=[{key:"5200",text:"5200"},{key:"5205",text:"5205"},{key:"5320",text:"5320"},{key:"5500",text:"5500"},{key:"5540",text:"5540"},{key:"5600",text:"5600"},{key:"ACM40e",text:"ACM40e"},{key:"ACM80eRack",text:"ACM80eRack"},{key:"ACM80eWand",text:"ACM80eWand"},{key:"intus com",text:"INTUS COM"},{key:"RFID-Zutrittsleser",text:"RFID-Zutrittsleser"},{key:"RFID-Technologie",text:"RFID-Technologie"},{key:"Flex Air",text:"Flex Air"},{key:"Flex OnCard ",text:"Flex OnCard"},{key:"PegaSys",text:"PegaSys"},{key:"DEXICON",text:"DEXICON"},{key:"DEXIOS",text:"DEXIOS"},{key:"INTUS COM/TPI",text:"INTUS COM/TPI"},{key:"TCL",text:"TCL"},{key:"Palm Secure",text:"Palm Secure"},{key:"Fingerprint",text:"Fingerprint"},{key:"Kaufmännisches",text:"Kaufmännisches"},{key:"Rechtliches",text:"Rechtliches"},{key:"Geräte-Firmware",text:"Geräte-Firmware"},{key:"Leser-Firmware",text:"Leser-Firmware"},{key:"Sonstiges",text:"Sonstiges"}],xe=[{key:"Suchaufwand in interner Doku erspart.",text:"Suchaufwand in interner Doku erspart."},{key:"Rücksprache mit Kollegen erspart.",text:"Rücksprache mit Kollegen erspart."},{key:"Rücksprache mit Experten erspart.",text:"Rücksprache mit Experten erspart."},{key:"Sonstiges, siehe unten:",text:"Sonstiges, siehe unten:"}],fe=({disabled:de,question:ge,answer:x,tabName:M,prompt:L})=>{const[K,T]=i.useState(!1),{instance:E}=O();te&&ne(E);const[j,d]=i.useState(""),P=(s,e)=>{e?e.length<=5e3&&d(e):d("")},[b,g]=i.useState(""),q=(s,e)=>{e?e.length<=5e3&&g(e):g("")},[A,C]=i.useState(""),W=(s,e)=>{e?e.length<=5e3&&C(e):C("")},[N,k]=i.useState(""),U=(s,e)=>{e?e.length<=5e3&&k(e):k("")},[_,m]=i.useState(""),G=(s,e)=>{e?e.length<=5e3&&m(e):m("")},[X,f]=i.useState(""),Z=(s,e)=>{e?e.length<=5e3&&f(e):f("")},[z,B]=i.useState(""),H=(s,e)=>{e?e.length<=5e3&&B(e):B("")},J=async()=>{const s=R?await se(R):void 0,e=x.choices[0].context.thoughts[1].description,h=[];if(e.length>0)for(const r of e)"sourcepage"in r&&h.push(r.sourcepage);const o=I.map(r=>r.text),l=v.map(r=>r.text),p=new Date,$={TabName:M,Frage:x.choices[0].context.thoughts[0].description,AntwortChatGPT:x.choices[0].message.content,NewPrompt:L,Kontext:h,Korrektheit:u?.text,korrekte_Antwort:b,Quelle:A,Anmerkung:N,Benefit:l,BenefitMinuten:z,Sonstiges:_,Thema:o,Benutzer:j,Zeitstempel:p,model:"gpt-4"},V=JSON.stringify($)+`
`;try{const r=await ae(V,s)}catch(r){console.log(r)}finally{T(!0),d(""),k(""),m(""),C(""),f(""),g(""),F([]),w(void 0),D([]),setTimeout(()=>{T(!1)},6e3)}},[u,w]=i.useState(),[v,F]=i.useState([]),[I,D]=i.useState([]),Q=(s,e,h)=>{if(!e){console.log("Keine Auswahl!");return}const o=[...I];if(e.selected)o.push(e);else{const l=o.findIndex(p=>p.key===e.key);l!==-1&&o.splice(l,1)}D(o)},Y=(s,e,h)=>{if(!e){console.log("Keine Auswahl!");return}const o=[...v];if(e.selected)o.push(e);else{const l=o.findIndex(p=>p.key===e.key);l!==-1&&o.splice(l,1)}F(o)};return t.jsxs("div",{children:[K&&t.jsx("div",{style:{position:"fixed",top:"10px",right:"10px",background:"#9CBF2B",padding:"10px",borderRadius:"5px",boxShadow:"0 0 10px rgba(0, 0, 0, 0.2)"},children:t.jsx("p",{children:"Gespeichert!"})}),t.jsxs(a,{className:n.evaluationContainer,children:[t.jsx(a,{horizontal:!0,className:n.evaluationInputContainer,children:t.jsx(y,{label:"Ist die Antwort korrekt?",selectedKey:u?u.key:void 0,onChange:(s,e,h)=>{w(e)},placeholder:"Wähle eine Option",options:he,styles:S})}),(u?.text==="Nein"||u?.text==="Teils")&&t.jsxs("div",{children:[t.jsx(a,{horizontal:!0,className:n.evaluationInputTextContainer,children:t.jsx(c,{className:n.evaluationInputTextContainer,resizable:!1,placeholder:"Bitte gib die richtige Antwort an: ",value:b,onChange:q,maxLength:4e3})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputTextContainer,children:t.jsx(c,{className:n.evaluationInputTextContainer,resizable:!1,placeholder:"In welchem Handbuch steht die Antwort? ",value:A,onChange:W})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputTextContainer,children:t.jsx(c,{className:n.evaluationInputTextContainer,resizable:!1,placeholder:"Anmerkung: ",value:N,onChange:U,maxLength:4e3})})]}),t.jsx(a,{horizontal:!0,className:n.evaluationInputContainer,children:t.jsx(y,{label:"Auf welches Thema bezieht sich die Frage?",selectedKeys:I?.map(s=>s.key.toString()),onChange:Q,placeholder:"Wähle eine Option",options:pe,styles:S,multiSelect:!0})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputTextContainer,children:t.jsx(c,{className:n.evaluationInputTextContainer,resizable:!1,placeholder:"Support Ticket ID: ",value:X,onChange:Z})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputContainer,children:t.jsx(y,{label:"Was hat dir die Antwort gebracht?",selectedKeys:v?.map(s=>s.key.toString()),onChange:Y,placeholder:"Wähle eine Option",options:xe,styles:S,multiSelect:!0})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputTextContainer,children:t.jsx(c,{className:n.evaluationInputTextContainer,resizable:!1,placeholder:"Wieviel Zeitersparnis (in Minuten) hat dir Athena gebracht?",value:z,onChange:H})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputTextContainer,children:t.jsx(c,{className:n.evaluationInputTextContainer,resizable:!1,placeholder:"Sonstiges: ",value:_,onChange:G})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputTextContainer,children:t.jsx(c,{className:n.evaluationInputTextContainer,resizable:!1,placeholder:"Bitte gib deinen Namen an: ",value:j,onChange:P})}),t.jsx(a,{horizontal:!0,className:n.evaluationInputButtonsContainer,children:t.jsx(oe,{style:{color:"black",marginLeft:"10px"},iconProps:{iconName:"Save"},title:"Speichern",ariaLabel:"Speichern",onClick:()=>J()})})]})]})};export{fe as E};
//# sourceMappingURL=EvaluationInput-a43b4d05.js.map