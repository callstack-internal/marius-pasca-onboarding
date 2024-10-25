#import "Weather.h"

@implementation Weather
RCT_EXPORT_MODULE()

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (NSString *)capitalizeLetter:(NSString *)text {
    // Convert NSString to std::string
    std::string stdText = [text UTF8String];

    // Call the C++ capitalizeLetter function (assumed to be in a 'weather' namespace)
    std::string resultStdString = weather::capitalizeLetter(stdText);

    // Convert the C++ std::string result back to NSString
    NSString *result = [NSString stringWithUTF8String:resultStdString.c_str()];

    return result;

}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeWeatherSpecJSI>(params);
}
#endif

@end
