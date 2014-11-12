(function($){
	$(document).ready(function (){

		var util = {
			stream2Url: function(stream){
				var objectUrl =  window.URL ? window.URL.createObjectURL(stream) : stream;
				return objectUrl;
			}
		};

		var imgSrc = './assets/images/beastie.png';
		var img = new Image();
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		img.addEventListener('load', imgLoad);
		img.src = imgSrc;

		function imgLoad(e){
			var img = this;
			canvas.width = img.width;
			canvas.height = img.height;
			context.drawImage(img, 0, 0, img.width, img.height);
			//document.body.appendChild(canvas);
			var base64Img = canvas.toDataURL();
			//document.write(base64Img);
			//console.log(base64Img);
			base64Img = base64Img.split(';base64,')[1];
			//console.log(base64Img);
			base64Img = base64.decode(base64Img);
			//console.log(base64Img);


			var generatedFile = new File([base64Img], "test.png", {type: "image/png", lastModified: new Date()});
			var reader = new FileReader();
			reader.readAsText(generatedFile);
			reader.addEventListener('load', function(e){
				//console.log(this.result);
			});
			console.log(generatedFile);
			//console.log(util.stream2Url(generatedFile));
		}

		$('input[name="file"]').on('change', function(e){
			var files = e.target.files;
			if(files.length > 0){
				for(var i=0, j = files.length; i < j; i++){
					console.log(files[i]);
					//console.log(util.stream2Url(files[i]));
					var reader = new FileReader();
					reader.readAsText(files[i]);
					reader.addEventListener('load', function(e){
						console.log(typeof  this.result);
					});
				}
			}
			var $self = $(this);
			$self.val('');

		});

	});
})(window.jQuery);