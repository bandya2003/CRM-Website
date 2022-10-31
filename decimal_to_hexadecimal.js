<script>

// Javascript program to convert a decimal
// number to hexadecimal number

// function to convert decimal to hexadecimal
function decToHexa(n)
{
	// char array to store hexadecimal number
	var hexaDeciNum = Array.from({length: 100},
					(_, i) => 0);

	// counter for hexadecimal number array
	var i = 0;
	while (n != 0) {
		// temporary variable to store remainder
		var temp = 0;

		// storing remainder in temp variable.
		temp = n % 16;

		// check if temp < 10
		if (temp < 10) {
			hexaDeciNum[i] =
			String.fromCharCode(temp + 48);
			i++;
		}
		else {
			hexaDeciNum[i] =
			String.fromCharCode(temp + 55);
			i++;
		}

		n = parseInt(n / 16);
	}

	// printing hexadecimal number array in reverse
	// order
	for (j = i - 1; j >= 0; j--)
		document.write(hexaDeciNum[j]);
}

// driver program
var n = 2545;
decToHexa(n);

// This code contributed by shikhasingrajput

</script>
