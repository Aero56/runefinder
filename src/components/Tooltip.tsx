import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  arrow,
  FloatingArrow,
  useTransitionStyles,
} from '@floating-ui/react';
import type { Placement } from '@floating-ui/react';
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  enabled?: boolean;
}

const useTooltip = ({
  initialOpen = false,
  placement = 'top',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  enabled = true,
}: TooltipOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const arrowRef = useRef(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'start',
        padding: 5,
      }),
      shift({ padding: 10 }),
      arrow({ element: arrowRef }),
    ],
  });

  const context = data.context;

  const hover = useHover(context, {
    move: false,
    enabled: enabled ?? controlledOpen == null,
  });
  const focus = useFocus(context, {
    enabled: enabled ?? controlledOpen == null,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const interactions = useInteractions([hover, focus, dismiss, role]);

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
  });

  return useMemo(
    () => ({
      open,
      setOpen,
      arrowRef,
      isMounted,
      transitionStyles,
      ...interactions,
      ...data,
    }),
    [open, setOpen, isMounted, transitionStyles, interactions, data],
  );
};

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = createContext<ContextType>(null);

const useTooltipContext = () => {
  const context = useContext(TooltipContext);

  if (context == null) {
    throw new Error('Tooltip components must be wrapped in <Tooltip />');
  }

  return context;
};

export const Tooltip = ({
  children,
  ...options
}: { children: React.ReactNode } & TooltipOptions) => {
  const tooltip = useTooltip(options);

  return (
    <TooltipContext.Provider value={tooltip}>
      {children}
    </TooltipContext.Provider>
  );
};

export const TooltipTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(({ children, asChild = false, ...props }, propRef) => {
  const context = useTooltipContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <div
      ref={ref}
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

export const TooltipContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ style, ...props }, propRef) => {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open && !context.isMounted) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...context.floatingStyles,
          ...context.transitionStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
        className={`${props.className} z-50 max-w-[calc(100vw-24px)] rounded bg-black-pearl-800 fill-black-pearl-800 px-3 py-2 shadow-md`}
      >
        {props.children}
        <FloatingArrow ref={context.arrowRef} context={context.context} />
      </div>
    </FloatingPortal>
  );
});
