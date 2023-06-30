(()=>{"use strict";var t,e,i=function(){function t(t,e,i){this.ctx=t,this.start=e,this.end=i}return t.prototype.Draw=function(){var t=this.start,e=t[0],i=t[1],o=this.end,n=o[0],s=o[1];this.ctx.beginPath(),this.ctx.moveTo(e,i),this.ctx.lineTo(n,s),this.ctx.stroke()},t}(),o=function(){function t(t,e,i,o){this.cellSize=t,this.ctx=o;var n=i%t,s=e%t;this.height=i-n,this.width=e-s}return t.prototype.Draw=function(){for(var t=0;t<=this.height;t+=this.cellSize)new i(this.ctx,[0,t],[this.width,t]).Draw();for(t=0;t<=this.width;t+=this.cellSize)new i(this.ctx,[t,0],[t,this.height]).Draw()},t.prototype.GetWidth=function(){return this.width-this.cellSize},t.prototype.GetHeight=function(){return this.height-this.cellSize},t.prototype.GetCellSize=function(){return this.cellSize},t}();!function(t){t[t.DEAD=0]="DEAD",t[t.ALIVE=1]="ALIVE"}(t||(t={})),function(t){t[t.toDead=0]="toDead",t[t.toAlive=1]="toAlive"}(e||(e={}));var n=function(){function i(t,e,i,o){this.position=[0,0],this.size=t;var n=e[0],s=e[1];this.position[0]=n,this.position[1]=s,this.state=i,this.ctx=o}return i.prototype.Draw=function(t){var e=this,i=this.position,o=i[0],n=i[1];this.ctx.fillStyle=t,this.ctx.fillRect(o*this.size+1,n*this.size+1,this.size-2,this.size-2),setTimeout((function(){requestAnimationFrame((function(){return e.Draw(t)}))}),0)},i.prototype.GetPosition=function(){return this.position},i.prototype.IsAlive=function(){return this.state===t.ALIVE},i.prototype.SearchNeighbors=function(i){for(var o=this,n=this.position,s=n[0],r=n[1],h=i.GetX(),a=i.GetY(),c=[],l=0,u=[[s,r-1],[s+1,r-1],[s+1,r],[s+1,r+1],[s,r+1],[s-1,r+1],[s-1,r],[s-1,r-1]];l<u.length;l++){var f=u[l],p=f[0],v=f[1];if(!(p<0||v<0||p>=h||v>=a)){var g=i.GetCell([p,v]);g&&g.IsAlive()&&c.push(g)}}c.length<=1&&this.state===t.ALIVE?(this.state=t.DEAD,e.toDead,requestAnimationFrame((function(){o.Draw("white")}))):3===c.length&&this.state===t.DEAD?(this.state=t.ALIVE,e.toAlive,requestAnimationFrame((function(){o.Draw("green")}))):c.length>3&&this.state===t.ALIVE&&(this.state=t.DEAD,e.toDead,requestAnimationFrame((function(){o.Draw("white")})))},i}(),s=function(){function t(t,e){this.grid=t,this.ctx=e,this.values=[];for(var i=Math.floor(t.GetWidth()/t.GetCellSize()),o=Math.floor(t.GetHeight()/t.GetCellSize()),s=0;s<=i;s++){this.values[s]=[];for(var r=0;r<=o;r++)this.values[s][r]=new n(this.grid.GetCellSize(),[s,r],0,e)}}return t.prototype.GetX=function(){return this.values.length},t.prototype.GetY=function(){return this.values[0].length},t.prototype.GetCell=function(t){var e=t[0],i=t[1];try{return this.values[e][i]}catch(e){e instanceof Error&&console.log("Exception caught at GetCell(), position ".concat(t," is off the board: ").concat(e.message))}},t.prototype.SetCell=function(t){try{var e=t.GetPosition(),i=e[0],o=e[1];this.values[i][o]=t}catch(e){e instanceof Error&&console.log("Exception caught at SetCell(), position ".concat(t.GetPosition()," is off the board: ").concat(e.message))}},t.prototype.Start=function(t){for(;t>0;){for(var e=0;e<this.values.length;e++)for(var i=0;i<this.values[0].length;i++)this.values[e][i].SearchNeighbors(this);t--}},t}(),r=document.getElementById("canvas");r.height=window.innerHeight,r.width=window.innerWidth;var h=r.getContext("2d"),a=new o(25,r.width,r.height,h);a.Draw();for(var c=new s(a,h),l=0;l<=100;){var u=Math.floor(Math.random()*c.GetX()),f=Math.floor(Math.random()*c.GetY()),p=new n(a.GetCellSize(),[u,f],1,h);p.Draw("green"),c.SetCell(p),l++}!function(t){t.Start(1e3)}(c)})();