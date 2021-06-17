//
//  Restart.m
//  TemplateProject
//
//  Created by MacMini 244 on 6/16/21.
//

#import <Foundation/Foundation.h>
#import "MyRestart.h"

@implementation MyRestart

RCT_EXPORT_MODULE(RNRestart)

- (void)loadBundle
{
    RCTTriggerReloadCommandListeners(@"templateProject: Restart");
}

RCT_EXPORT_METHOD(Restart) {
    if ([NSThread isMainThread]) {
        [self loadBundle];
    } else {
        dispatch_sync(dispatch_get_main_queue(), ^{
            [self loadBundle];
        });
    }
    return;
}

@end
