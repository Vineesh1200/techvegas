import{$a as i,Ka as o,La as g,Ma as n,ab as l,bb as p}from"./chunk-DWY52GTV.js";import{a as r,b as s}from"./chunk-K3IAFSO2.js";var a=g({source:"Categories",events:{"Get Categories":n(),"Get Categories Success":o(),"Failed Categories Api":o()}});var E="categories",c=p({selectId:e=>e}),C=c.getInitialState({errorMessage:""}),f=l(C,i(a.getCategoriesSuccess,(e,{categories:t})=>c.setAll(t,s(r({},e),{errorMessage:""}))),i(a.failedCategoriesApi,(e,{errorMessage:t})=>s(r({},e),{categories:e.entities,errorMessage:t}))),{selectAll:M,selectEntities:I,selectIds:G,selectTotal:U}=c.getSelectors();export{a,E as b,f as c,M as d};
