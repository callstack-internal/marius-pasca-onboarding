#ifdef __cplusplus
#import "react-native-weather.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNWeatherSpec.h"

@interface Weather : NSObject <NativeWeatherSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Weather : NSObject <RCTBridgeModule>
#endif

@end
