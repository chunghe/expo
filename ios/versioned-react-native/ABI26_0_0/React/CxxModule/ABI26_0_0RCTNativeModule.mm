/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "ABI26_0_0RCTNativeModule.h"

#import <ReactABI26_0_0/ABI26_0_0RCTBridge.h>
#import <ReactABI26_0_0/ABI26_0_0RCTBridgeMethod.h>
#import <ReactABI26_0_0/ABI26_0_0RCTBridgeModule.h>
#import <ReactABI26_0_0/ABI26_0_0RCTCxxUtils.h>
#import <ReactABI26_0_0/ABI26_0_0RCTFollyConvert.h>
#import <ReactABI26_0_0/ABI26_0_0RCTLog.h>
#import <ReactABI26_0_0/ABI26_0_0RCTProfile.h>
#import <ReactABI26_0_0/ABI26_0_0RCTUtils.h>

#ifdef WITH_FBSYSTRACE
#include <fbsystrace.h>
#endif

namespace facebook {
namespace ReactABI26_0_0 {

static MethodCallResult invokeInner(ABI26_0_0RCTBridge *bridge, ABI26_0_0RCTModuleData *moduleData, unsigned int methodId, const folly::dynamic &params);

ABI26_0_0RCTNativeModule::ABI26_0_0RCTNativeModule(ABI26_0_0RCTBridge *bridge, ABI26_0_0RCTModuleData *moduleData)
    : m_bridge(bridge)
    , m_moduleData(moduleData) {}

std::string ABI26_0_0RCTNativeModule::getName() {
  return [m_moduleData.name UTF8String];
}

std::vector<MethodDescriptor> ABI26_0_0RCTNativeModule::getMethods() {
  std::vector<MethodDescriptor> descs;

  for (id<ABI26_0_0RCTBridgeMethod> method in m_moduleData.methods) {
    descs.emplace_back(
      method.JSMethodName,
      ABI26_0_0RCTFunctionDescriptorFromType(method.functionType)
    );
  }

  return descs;
}

folly::dynamic ABI26_0_0RCTNativeModule::getConstants() {
  ABI26_0_0RCT_PROFILE_BEGIN_EVENT(ABI26_0_0RCTProfileTagAlways,
    @"[ABI26_0_0RCTNativeModule getConstants] moduleData.exportedConstants", nil);
  NSDictionary *constants = m_moduleData.exportedConstants;
  folly::dynamic ret = convertIdToFollyDynamic(constants);
  ABI26_0_0RCT_PROFILE_END_EVENT(ABI26_0_0RCTProfileTagAlways, @"");
  return ret;
}

void ABI26_0_0RCTNativeModule::invoke(unsigned int methodId, folly::dynamic &&params, int callId) {
  // capture by weak pointer so that we can safely use these variables in a callback
  __weak ABI26_0_0RCTBridge *weakBridge = m_bridge;
  __weak ABI26_0_0RCTModuleData *weakModuleData = m_moduleData;
  // The BatchedBridge version of this buckets all the callbacks by thread, and
  // queues one block on each.  This is much simpler; we'll see how it goes and
  // iterate.
  dispatch_block_t block = [weakBridge, weakModuleData, methodId, params=std::move(params), callId] {
    #ifdef WITH_FBSYSTRACE
    if (callId != -1) {
      fbsystrace_end_async_flow(TRACE_TAG_REACT_APPS, "native", callId);
    }
    #endif
    invokeInner(weakBridge, weakModuleData, methodId, std::move(params));
  };

  dispatch_queue_t queue = m_moduleData.methodQueue;
  if (queue == ABI26_0_0RCTJSThread) {
    block();
  } else if (queue) {
    dispatch_async(queue, block);
  }
}

MethodCallResult ABI26_0_0RCTNativeModule::callSerializableNativeHook(unsigned int ReactABI26_0_0MethodId, folly::dynamic &&params) {
  return invokeInner(m_bridge, m_moduleData, ReactABI26_0_0MethodId, params);
}

static MethodCallResult invokeInner(ABI26_0_0RCTBridge *bridge, ABI26_0_0RCTModuleData *moduleData, unsigned int methodId, const folly::dynamic &params) {
  if (!bridge || !bridge.valid || !moduleData) {
    return folly::none;
  }

  id<ABI26_0_0RCTBridgeMethod> method = moduleData.methods[methodId];
  if (ABI26_0_0RCT_DEBUG && !method) {
    ABI26_0_0RCTLogError(@"Unknown methodID: %ud for module: %@",
                methodId, moduleData.name);
  }

  NSArray *objcParams = convertFollyDynamicToId(params);
  @try {
    id result = [method invokeWithBridge:bridge module:moduleData.instance arguments:objcParams];
    return convertIdToFollyDynamic(result);
  }
  @catch (NSException *exception) {
    // Pass on JS exceptions
    if ([exception.name hasPrefix:ABI26_0_0RCTFatalExceptionName]) {
      @throw exception;
    }

    NSString *message = [NSString stringWithFormat:
                         @"Exception '%@' was thrown while invoking %s on target %@ with params %@\ncallstack: %@",
                         exception, method.JSMethodName, moduleData.name, objcParams, exception.callStackSymbols];
    ABI26_0_0RCTFatal(ABI26_0_0RCTErrorWithMessage(message));
  }

  return folly::none;
}

}
}
