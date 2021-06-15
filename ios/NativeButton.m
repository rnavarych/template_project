//
//  NativeButton.m
//  TemplateProject
//
//  Created by MacMini 244 on 6/15/21.
//

#import <Foundation/Foundation.h>
#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(NativeButton, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(onClick, RCTDirectEventBlock)
@end
