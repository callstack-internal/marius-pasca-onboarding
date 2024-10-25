#include "react-native-weather.h"
#include <string>

namespace weather
{
	std::string capitalizeLetter(std::string text)
	{

		for (int x = 0; x < text.length(); x++)
		{
			if (x == 0 || text[x - 1] == ' ')
			{
				text[x] = toupper(text[x]);
			}
		}

		return text;
	}
}
