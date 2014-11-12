(function($){
	$(document).ready(function (){

		// 工具集合
		var util = {
			// 将 blob 生成 url 链接
			stream2Url: function(stream){
				var objectUrl =  window.URL ? window.URL.createObjectURL(stream) : stream;
				return objectUrl;
			}
		};

		// 初始化环境变量
		var imgSrc = './assets/images/beastie.png';
		var img = new Image();
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		img.addEventListener('load', imgLoad);
		img.src = imgSrc;

		// 加载图片完成后运行
		function imgLoad(e){

			// 将图片装到canvas 中并且导出 base64
			var img = this;
			canvas.width = img.width;
			canvas.height = img.height;
			context.drawImage(img, 0, 0, img.width, img.height);
			//document.body.appendChild(canvas);
			var base64Img = canvas.toDataURL();
			//document.write(base64Img);
			//console.log(base64Img);

			// 解析 base64
			base64Img = base64Img.split(';base64,')[1];
			//console.log(base64Img);
			//base64Img = base64.decode(base64Img);
			//console.log(base64Img);
			//console.log(base64.encode(base64Img));

			// 将 转码后的图片 装入图片对象
			//var generatedFile = new File([base64Img], "test.png", {type: "image/png", lastModified: new Date()});

			var blob = base64ToBlob(base64Img, 'image/png');
			var generatedFile = new File([blob], "test.png", {type: "image/png", lastModified: new Date()});


			// 读取改图片对象
			var reader = new FileReader();
			reader.readAsText(generatedFile);
			reader.addEventListener('load', function(e){
				//console.log(this.result);
			});
			console.log(generatedFile);
			var blobUrl = util.stream2Url(generatedFile);
			console.log(blobUrl);
			/*
			$.get(blobUrl, function(data){
				var base64Img = base64.encode(data);
				var blob = base64ToBlob(base64Img, 'image/png');
				var url = window.URL.createObjectURL(blob);
				console.log(url);
				//base64Img = 'data:image/png;base64,' + base64Img;
				//console.log(base64Img);
				//var test = new File([base64Img], "test.png", {type: "text/plan", lastModified: new Date()});
				//console.log(util.stream2Url(test));
			})
			*/
		}

		// input 读取文件
		$('input[name="file"]').on('change', function(e){
			var files = e.target.files;
			if(files.length > 0){
				for(var i=0, j = files.length; i < j; i++){
					console.log(files[i]);
					//console.log(util.stream2Url(files[i]));
					// 解析文件内容
					var reader = new FileReader();
					reader.readAsText(files[i]);
					reader.addEventListener('load', function(e){
						// 在控制台输出 内容
						console.log(typeof  this.result);
					});
				}
			}
			var $self = $(this);
			$self.val('');
		});
	});
})(window.jQuery);